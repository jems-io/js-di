const ts = require('gulp-typescript');
const merge = require('gulp-merge');

module.exports = function configureGulp(gulp) {
   
  gulp.task('transpile-source', function () {
    let tsProject = getTSProject();
    let result =  gulp.src(['./src/**/*'])
                      .pipe(tsProject())
                      .on('error', () => this.on("finish", () => process.exit(1)));

    return merge([result.js.pipe(gulp.dest('./bin/src')),
                  result.dts.pipe(gulp.dest('./bin/src'))])
  });

  gulp.task('transpile-test', function () {
    let tsProject = getTSProject();
    
    return gulp.src(['./test/**/*'])
               .pipe(tsProject())
               .on('error', () => this.on("finish", () => process.exit(1)))
               .js
               .pipe(gulp.dest('./bin/test'));
  });

  gulp.task('transpile', ['transpile-source', 'transpile-test']);
}

function getTSProject() {
  return ts.createProject('./tsconfig.json');
}