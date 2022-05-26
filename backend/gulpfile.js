const gulp = require("gulp");
const ts = require("gulp-typescript");
const uglify = require("gulp-uglify-es").default;
const rimraf = require("rimraf");

const tsProject = ts.createProject("tsconfig.json");

gulp.task("clean", cb => {
  rimraf("dist/*", cb);
});

gulp.task(
  "build",
  gulp.parallel("clean", () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(uglify()).pipe(gulp.dest("./dist"));
  })
);
