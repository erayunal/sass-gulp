const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const prefix = require("gulp-autoprefixer");
const rename = require("gulp-rename");
const reload = browserSync.reload;

gulp.task("browser-sync", function () {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "./public/",
    },
  });

  gulp.watch("./public/*.html").on("change", reload);
  gulp.watch("./public/scss/**/*.scss", gulp.series("css"));
  gulp.watch("./public/js/**/*.js", reload);
});

gulp.task("css", () => {
  return gulp
    .src("./public/scss/main.scss")
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(prefix())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./public/css/"))
    .pipe(browserSync.stream());
});

gulp.task("default", gulp.series("browser-sync", "css"));
