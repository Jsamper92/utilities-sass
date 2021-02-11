const [express, exphbs, sassdoc] = [
  require("express"),
  require("express-handlebars"),
  require("sassdoc")
];
const app = express();

app.engine(
  "hbs",
  exphbs({
    defaultLayout: "",
    extname: ".hbs"
  })
);

app.set("view engine", "hbs");

app.listen(3000, (req, res) => {
  console.log("The web server has started on port 3000");
});

sassdoc
  .parse(`${__dirname}/../sass/**/*.scss`, { verbose: true })
  .then(function (data) {
    app.get("/", (req, res) => {
      res.render(__dirname + "/views/layouts/main", {
        posts: data
      });
    });
  });