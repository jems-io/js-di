var gulp = require("gulp");
var ts = require("gulp-typescript");

var tsProject = ts.createProject("ts.config.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("distribution"));
});