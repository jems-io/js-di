const mocha = require('gulp-mocha');

module.exports = function configureGulp(gulp) {   
  gulp.task('test', getTestPipe);
  gulp.task('test-ci', ['transpile'], getTestPipe);

  function getTestPipe() {
    return gulp.src(['./bin/test/testStarter.js' , './bin/test/**/*.Spec.js'])
               .pipe(mocha());
  }
}


