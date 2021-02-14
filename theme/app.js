const [express, exphbs, sassdoc, fs, path] = [
  require("express"),
  require("express-handlebars"),
  require("sassdoc"),
  require("fs"),
  require("path")
];
const app = express();
const publicPath = path.resolve(__dirname, "public");



app.engine(
  "hbs",
  exphbs({
    helpers: require('./handlers/handlebars'),
    defaultLayout: "",
    extname: ".hbs"
  })
);

app.set("view engine", "hbs");
app.use(express.static(publicPath));
app.listen(3000, () => {
  console.log("The web server has started on port 3000");
});

const groupData = (array) => {
  return array.reduce((acc, item) => {
    let { group } = item;

    return { ...acc, [group]: [...(acc[group] || []), item] };
  }, {});
};

sassdoc
  .parse(`${__dirname}/../sass/**/*.scss`, { verbose: true })
  .then(function (data) {
    app.get("/", (req, res) => {
      
      // fs.writeFile('doc.json',JSON.stringify(groupData(data),null,2),() => true);
      res.render(__dirname + "/views/layouts/main", {
        posts: groupData(data)
      });
    });
  });
