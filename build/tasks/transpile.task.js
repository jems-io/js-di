const ts = require('gulp-typescript');
const merge = require('gulp-merge');
const clean = require('gulp-clean');

module.exports = function configureGulp(gulp) {
   
  gulp.task('transpile-source', ['clean-binaries'], function () {
    let tsProject = getTSProject();
    let hasError = false;
    let result =  gulp.src(['./src/**/*'])
                      .pipe(tsProject())
                      .on('error', () => hasError = true)
                      .on("finish", () => { if (hasError) process.exit(1) });

    return merge([result.js.pipe(gulp.dest('./bin/src')),
                  result.dts.pipe(gulp.dest('./bin/src'))])
  });

  gulp.task('transpile-test', ['transpile-source'], function () {
    let tsProject = getTSProject();
    let hasError = false;

    return gulp.src(['./test/**/*'])
               .pipe(tsProject())
               .on('error', () => hasError = true)
               .on("finish", () => { if (hasError) process.exit(1) })
               .js
               .pipe(gulp.dest('./bin/test'));
  });

  gulp.task('clean-binaries', function() {
    return gulp.src('./bin')
               .pipe(clean());
  });

  gulp.task('transpile', ['transpile-test']);
}

function getTSProject() {
  return ts.createProject('./tsconfig.json');
}