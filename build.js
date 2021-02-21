
const [fs, utils] = [require("fs"), require("./.frontech/utils")];
let indexItems = 0;
const pathSettings = `${__dirname}/dist/web/settings`;
const fileConfig = process.argv.filter((file) =>
  /.frontech.json/.test(file) ? file : null
);
const data = JSON.parse(
  fs.readFileSync(`${process.cwd()}/${fileConfig}`).toString()
);
const StyleDictionary = require("style-dictionary").extend({
  source: [".frontech.json"],
  platforms: {
    scss: {
      transformGroup: "scss",
      buildPath: `${process.cwd()}/dist/web/`,
      files: [
        {
          destination: "_colors.scss",
          format: "scss/variables",
          filter: {
            type: "color"
          }
        },
        {
          destination: "_typography.scss",
          format: "scss/variables",
          filter: {
            type: "typography"
          }
        },
        {
          destination: "_grid.scss",
          format: "custom/breakpoints",
          filter: {
            type: "grid"
          }
        },
        {
          destination: "_media-queries.scss",
          format: "custom/mediaqueries",
          filter: {
            type: "grid"
          }
        },
        {
          destination: "_spacing.scss",
          format: "custom/spacing",
          filter: {
            type: "spacing"
          }
        }
      ]
    },
    android: {
      transformGroup: "android",
      buildPath: `${process.cwd()}/dist/android/`,
      files: [
        {
          destination: "tokens.colors.xml",
          format: "android/colors"
        }
      ]
    },
    ios: {
      transformGroup: "ios",
      buildPath: `${process.cwd()}/dist/ios/`,
      files: [
        {
          destination: "tokens.h",
          format: "ios/macros"
        }
      ]
    }
  }
});

StyleDictionary.registerFormat({
  name: "custom/breakpoints",
  formatter: (dictionary) => {
    let result = [];
    for (const key in dictionary.properties.breakpoints) {
      let value = dictionary.properties.breakpoints[key];
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
          )`;
  }
});
StyleDictionary.registerFormat({
  name: "custom/mediaqueries",
  formatter: (dictionary) => {
    let result = [];
    for (const key in dictionary.properties.breakpoints) {
      let value = dictionary.properties.breakpoints[key];
      layout = value.gutter.attributes.type;
      const [width] = [value.width];
      result += `/// Mixin cuyo objetivo es crear la media-query en base a los puntos de corte establecidos en el fichero de configuración\n///\n///\n/// @example scss\n///\n///      .test{\n///         width: 100%;\n///         @include screen-${key}(){\n///           width: auto;\n///         }\n///      }\n///\n/// @example css\n///\n///      .test {\n///         width: 100%;\n///       }\n///\n///      @media only screen and (min-width: ${width}) {\n///         .test {\n///           width: auto;\n///         }\n///      }\n///\n/// @group media-queries \n@mixin screen-${key}{
            @media only screen and (min-width: ${width}) {
              @content
            }
          };\n`;
    }

    return result;
  }
});
StyleDictionary.registerFormat({
  name: "custom/spacing",
  formatter: (dictionary) => {
    const { increase, limit } = dictionary.properties.spacing;

    return `/// Mapa creado dinamicamente en base al fichero de configuración. Define los atributos para crear las clases de utilidad de margin y padding\n/// @type number\n/// @group spacing
      $spacing: (
          increase:${increase.value},
          limit:${limit.value}
      );
    `;
  }
});

utils.printMessage("Proceso de creación de settings iniciado");

utils.warningConsole(
  `En base a la información aportada en el fichero de configuración ${fileConfig} se procede a generar los siguientes archivos: \n`
);

StyleDictionary.buildAllPlatforms();
let partials = "";

for (const key in data) {
  indexItems++;
  partials += `@forward '${key}';\n`;
}
partials +=`@forward 'general';`;
if (Object.keys(data).length == indexItems) {
  utils.createFile(`${pathSettings}`, "settings.scss", partials);
}
utils.printMessage("Proceso de creación de settings finalizado");
