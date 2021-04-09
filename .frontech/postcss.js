const [fs, postcss, sass, autoprefixer, utils, symbols] = [
  require("fs"),
  require("postcss"),
  require("sass"),
  require("autoprefixer"),
  require("./utils"),
  require("log-symbols")
];
const file = `${__dirname.slice(
  0,
  __dirname.length - 10
)}/library/web/abstracts.scss`;

module.exports.buildCSS = (config) => {
  const transformSass = sass
    .renderSync({
      file,
      sourceMap: false,
      outputStyle: "compressed"
    })
    .css.toString();

  const buildCSS = postcss([autoprefixer]).process(transformSass).css;
  console.log(
    `\ncreación output css de las utilidades generadas en base al fichero de configuración`
  );

  if (config.outputCSS.path.length > 0 ) {
    fs.writeFile(config.outputCSS.path, buildCSS, () => false);
    console.log(
      `${symbols.success}  ${process.cwd()}/${config.outputCSS.path}`
    );
  } else {
    utils.errorConsole(
      `Revisa el fichero de configuración, has establecido la siguiente información:\n\n${JSON.stringify(
        { "outputCSS": config.outputCSS },
        null,
        2
      )}`
    );
  }
};
