#!/usr/bin/env node

const { mediaDocs } = require("./.frontech/utils");

const [fs, utils] = [require("fs"), require("./.frontech/utils")];

let indexItems = 0;
const pathSettings = `${__dirname}/sass`;
const fileConfig = process.argv.filter((file) =>
  /.frontech.json/.test(file) ? file : null
);
const data = JSON.parse(
  fs.readFileSync(`${process.cwd()}/${fileConfig}`).toString()
);

const generateGrid = (breakpoints) => {
  let grid = "";
  for (const key in breakpoints) {
    let value = breakpoints[key];

    const [gutter, offset, columns, width] = [
      value.gutter,
      value.offset,
      value.columns,
      value.width
    ];
    grid += `\n  ${key}: (\n    gutter:${gutter},\n    offset:${offset},\n    columns:${columns},\n    width:${width}\n  ),`;
  }

  return `/// Mapa creado dinamicamente en base al fichero de configuración. Define los puntos de ruptura de los distintos breakpoints\n/// @type map\n/// @group grid \n$breakpoints: (${grid}\n);`;
};

const generateMediaQueries = (breakpoints) => {
  let medias = "";
  for (const key in breakpoints) {
    let value = breakpoints[key];
    const [width] = [value.width];
    medias += `/// Mixin cuyo objetivo es crear la media-query en base a los puntos de corte establecidos en el fichero de configuración\n///\n///\n/// @example scss\n///\n///      .test{\n///         width: 100%;\n///         @include screen-md(){\n///           width: auto;\n///         }\n///      }\n///\n/// @example css\n///\n///      .test {\n///         width: 100%;\n///       }\n///\n///      @media only screen and (min-width: 768px) {\n///\n///         .test {\n///           width: auto;\n///         }\n///      }\n///\n/// @group media-queries
      @mixin screen-${key}{
        @media only screen and (min-width: ${width}) {
          @content
        }
      };
    `;
  }

  return medias;
};

const generateSpacing = (spacing) => {
  let spacers = `/// Mapa creado dinamicamente en base al fichero de configuración. Define los atributos para crear las clases de utilidad de margin y padding\n/// @type number\n/// @group spacing
  $spacing: (
      increase:${spacing.increase},
      limit:${spacing.limit}
  );
`;

  return spacers;
};

utils.printMessage("Proceso de creación de settings iniciado");

utils.warningConsole(
  `En base a la información aportada en el fichero de configuración ${fileConfig} se procede a generar los siguientes archivos: \n`
);

let partials = "";
for (const key in data) {
  indexItems++;
  let config = data[key];
  switch (key) {
    case "grid":
      const grid = generateGrid(config);
      const medias = generateMediaQueries(config);
      utils.createFile(`${pathSettings}/tools`, "_media-queries.scss", medias);
      utils.createFile(`${pathSettings}/settings`, "_grid.scss", grid);
      break;

    case "spacing":
      const spacing = generateSpacing(config);
      utils.createFile(`${pathSettings}/settings`, "_spacing.scss", spacing);
      break;
    default:
      break;
  }
  partials += `@forward '${key}';\n`;
  if (Object.keys(data).length == indexItems) {
    utils.createFile(`${pathSettings}/settings`, "settings.scss", partials);
  }
}

utils.printMessage("Proceso de creación de settings finalizado");
