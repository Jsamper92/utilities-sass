#!/usr/bin/env node

const [fs, utils, symbols, webfont] = [
  require("fs"),
  require("./.frontech/utils"),
  require("log-symbols"),
  require("webfont").default
];
let indexItems = 0;
const pathSettings = `${__dirname}/library/web`;
let grid = [];
const fileConfig = process.argv.filter((file) =>
  /.frontech.json/.test(file) ? file : null
);
const existData = fs.existsSync(`${process.cwd()}/${fileConfig}`);
if (existData) {
  const data = JSON.parse(
    fs.readFileSync(`${process.cwd()}/${fileConfig}`).toString()
  );
  const generateIconFont = async (svg) => {
    const { name, input, output } = svg;
    webfont({
      files: `${process.cwd()}/${input}/*.svg`,
      fontName: name,
      template: "scss",
      dest: `${__dirname}/library/web/settings/_icons.scss`,
      templateClassName: "icon",
      templateFontPath: "#{$font-path}",
      fontWeight: 800
    })
      .then((result) => {
        const file = (folder, file, data) => {
          utils.createFile(folder, file, data);
          console.log(`${symbols.success}  ${folder}/${file}`);
        };
        let utilities = fs.readdirSync(
          `${__dirname}/library/web/utilities/`,
          "utf-8",
          () => true
        );
        let partials = "";
        utilities.map((partial, index) =>
          index !== utilities.length - 1
            ? (partials += `@forward '${partial
                .replace("_", "")
                .replace(".scss", "")}';\n`)
            : null
        );
        fs.writeFileSync(
          `${__dirname}/library/web/utilities/utilities.scss`,
          partials,
          () => true
        );
        console.log(
          `\ncreación fuente icónica en base a los archivos svg de la ruta ${input}`
        );
        file(
          `${__dirname}/library/web/utilities`,
          `_icons.scss`,
          `@use '../settings/general' as *;\n${result.template}`
        );
        file(
          `${process.cwd()}/${output}`,
          `${result.config.fontName}.svg`,
          result.svg
        );
        file(
          `${process.cwd()}/${output}`,
          `${result.config.fontName}.ttf`,
          result.ttf
        );
        file(
          `${process.cwd()}/${output}`,
          `${result.config.fontName}.eot`,
          result.eot
        );
        file(
          `${process.cwd()}/${output}`,
          `${result.config.fontName}.woff`,
          result.woff
        );
        utils.printMessage("Proceso de creación de settings finalizado");
      })
      .catch(() => {
        utils.errorConsole(
          `\nRevisa el fichero de configuración, has establecido la siguiente información:\n\n${JSON.stringify(
            svg,
            null,
            2
          )}`
        );
        utils.createFile(
          `${__dirname}/library/web/utilities`,
          `_icons.scss`,
          `// Para generar la fuente icónica, revisa el fichero de configuración .frontech.json`
        );
      });
  };
  const StyleDictionary = require("style-dictionary").extend({
    source: [".frontech.json"],
    platforms: {
      scss: {
        transformGroup: "scss",
        buildPath: `${__dirname}/library/web/`,
        files: [
          {
            destination: "settings/_color.scss",
            format: "custom/properties-color",
            filter: {
              type: "color"
            }
          },
          {
            destination: "settings/_typography.scss",
            format: "custom/properties-typography",
            filter: {
              type: "typography"
            }
          },
          {
            destination: "utilities/_icons.scss",
            format: "custom/properties-icons",
            filter: {
              type: "icons"
            }
          },
          {
            destination: "settings/_grid.scss",
            format: "custom/grid",
            filter: {
              type: "grid"
            }
          },
          {
            destination: "tools/_media-queries.scss",
            format: "custom/mediaqueries",
            filter: {
              type: "grid"
            }
          },
          {
            destination: "settings/_spacing.scss",
            format: "custom/spacing",
            filter: {
              type: "spacing"
            }
          }
        ]
      },
      android: {
        transformGroup: "android",
        buildPath: `${__dirname}/library/android/`,
        files: [
          {
            destination: "tokens.colors.xml",
            format: "android/colors",
            filter: {
              type: "color"
            }
          }
        ]
      },
      ios: {
        transformGroup: "ios",
        buildPath: `${__dirname}/library/ios/`,
        files: [
          {
            destination: "tokens.color.h",
            format: "ios/macros",
            filter: {
              type: "color"
            }
          },
          {
            destination: "tokens.font.h",
            format: "ios/singleton.h",
            filter: {
              type: "typography"
            }
          },
          {
            destination: "tokens.font.m",
            format: "ios/singleton.m",
            filter: {
              type: "typography"
            }
          }
        ]
      }
    }
  });

  StyleDictionary.registerFormat({
    name: "custom/grid",
    formatter: (dictionary) => {
      try {
        let result = [];
        if (typeof dictionary.properties.grid === "undefined")
          throw new Error();
        for (const key in dictionary.properties.grid) {
          let value = dictionary.properties.grid[key];
          grid.push(key);
          layout = value.gutter.attributes.type;
          const [gutter, offset, columns, width] = [
            value.gutter,
            value.offset,
            value.columns,
            value.width
          ];
          result += `${layout}:(
                ${gutter.path[2]}:${gutter.value},
                ${offset.path[2]}:${offset.value},
                ${columns.path[2]}:${columns.value},
                ${width.path[2]}:${width.value}
              ),`;
        }

        return `/// Mapa creado dinamicamente en base al fichero de configuración. Define los puntos de ruptura de los distintos breakpoints\n/// @type map\n/// @group grid \n$breakpoints: (
                    ${result}
                );`;
      } catch {
        utils.errorConsole(
          `${symbols.error}  No se ha especificado ninguna configuración de las utilidades de grid. El archivo se creará sin contenido. Por favor revisa el fichero de configuración .frontech.json.`
        );
        return "// Para generar la configuración de grid, revisa el fichero de configuración .frontech.json\n$breakpoints:()!default;";
      }
    }
  });
  StyleDictionary.registerFormat({
    name: "custom/mediaqueries",
    formatter: (dictionary) => {
      try {
        let result = [];
        if (typeof dictionary.properties.grid === "undefined")
          throw new Error();
        for (const key in dictionary.properties.grid) {
          let value = dictionary.properties.grid[key];
          layout = value.gutter.attributes.type;
          const [width] = [value.width];
          result += `/// Mixin cuyo objetivo es crear la media-query en base a los puntos de corte establecidos en el fichero de configuración\n///\n///\n/// @example scss\n///\n///      .test{\n///         width: 100%;\n///         @include screen-${key}(){\n///           width: auto;\n///         }\n///      }\n///\n/// @example css\n///\n///      .test {\n///         width: 100%;\n///       }\n///\n///      @media only screen and (min-width: ${width}) {\n///         .test {\n///           width: auto;\n///         }\n///      }\n///\n/// @group media-queries \n@mixin screen-${key}{
                  @media only screen and (min-width: ${width}) {
                    @content
                  }
                };\n`;
        }

        return result;
      } catch {
        utils.errorConsole(
          `${symbols.error}  No se ha especificado ninguna configuración de las utilidades de grid. El archivo se creará sin contenido. Por favor revisa el fichero de configuración .frontech.json.`
        );
        return "// Para generar los mixin de mediaqueries, revisa el fichero de configuración .frontech.json";
      }
    }
  });
  StyleDictionary.registerFormat({
    name: "custom/spacing",
    formatter: (dictionary) => {
      try {
        const { increase, limit } = dictionary.properties.spacing;

        return `/// Mapa creado dinamicamente en base al fichero de configuración. Define los atributos para crear las clases de utilidad de margin y padding\n/// @type number\n/// @group spacing
            $spacing: (
                increase:${increase.value},
                limit:${limit.value}
            );
          `;
      } catch {
        utils.errorConsole(
          `${symbols.error}  No se ha especificado ninguna configuración de las utilidades de margin y padding. El archivo se creará sin contenido. Por favor revisa el fichero de configuración .frontech.json.`
        );
        return "// Para generar las utilidades de margin y padding, revisa el fichero de configuración .frontech.json\n$spacing:() !default;";
      }
    }
  });
  StyleDictionary.registerFormat({
    name: "custom/properties-color",
    formatter: (dictionary) => {
      try {
        let key = Object.keys(dictionary.properties.color);
        let customProperties = "\n";
        key.forEach((item) => {
          value = dictionary.properties.color[item];
          customProperties += `--${item}:${value.value};\n`;
        });
        return `/// Variables de color definida en el archivo .frontech.json\n///@group colors\n:root{${customProperties}};`;
      } catch {
        utils.errorConsole(
          `${symbols.error}  No se ha especificado ninguna configuración de colores. El archivo se creará sin contenido. Por favor revisa el fichero de configuración .frontech.json.`
        );
        return "// Para generar las custom properties de colores, revisa el fichero de configuración .frontech.json";
      }
    }
  });

  StyleDictionary.registerFormat({
    name: "custom/properties-typography",
    formatter: (dictionary) => {
      try {
        let key = Object.keys(dictionary.properties.typography);
        let fonts = "";
        let customProperties = "";

        key.forEach((font) => {
          value = dictionary.properties.typography[font];
          fonts += `\n${font}: (\nname:${value.family.value},\nweight:${value.weight.value},\nstyle:${value.style.value}\n),`;
          customProperties += `--${font}:${value.family.value};\n`;
        });
        return `/// Mapa de fuentes definida en el archivo .frontech.json\n///@group fonts\n$fonts:(${fonts});\n\n/// Custom properties cuyo valor es el nombre aportado en el fichero .frontech.json\n/// @group fonts\n:root{\n${customProperties}};`;
      } catch (error) {
        utils.errorConsole(
          `${symbols.error}  No se ha especificado ninguna configuración de tipografias. El archivo se creará sin contenido. Por favor revisa el fichero de configuración .frontech.json.`
        );
        return "// Para generar la fuentes de texto, revisa el fichero de configuración .frontech.json\n$fonts:() !default;";
      }
    }
  });
  StyleDictionary.registerFormat({
    name: "custom/properties-icons",
    formatter: (dictionary) => {
      try {
        let key = Object.keys(dictionary.properties.typography);
        let icon;

        key.forEach((font) => {
          value = dictionary.properties.typography[font];
          value.family.input && value.family.output
            ? (icon = {
                name: font,
                input: value.family.input,
                output: value.family.output
              })
            : utils.warningConsole(
                `${symbols.warning}  Revisa el archivo de configuración. Para la creación de la fuente icónica has introducido la ruta origen ${value.family.input} y la ruta de salida ${value.family.output}`
              );
        });
        generateIconFont(icon)
      } catch (error) {
        utils.errorConsole(
          `${symbols.error}  No se ha especificado ninguna configuración de fuente icónica. El archivo se creará sin contenido. Por favor revisa el fichero de configuración .frontech.json.`
        );
        return '// Para generar la fuente icónica, revisa el fichero de configuración .frontech.json'
      }
    }
  });

  utils.printMessage("Proceso de creación de settings iniciado");

  utils.warningConsole(
    `En base a la información aportada en el fichero de configuración ${fileConfig} se procede a generar los siguientes archivos: \n`
  );

  StyleDictionary.buildAllPlatforms();
} else {
  utils.errorConsole(
    `No se ha especificado ningún archivo de configuración .frontech.json`
  );
}
