const zip = require('gulp-zip');

module.exports = function configureGulp(gulp) {   
  gulp.task('zip', getZipPipe)
  gulp.task('zip-cd', ['distribute-cd'], getZipPipe)

  function getZipPipe() {
    let currentVersion = require('../../package.json').version;

    return gulp.src('./dist/**/*')
               .pipe(zip(`@jems.di-${currentVersion}.zip`))
               .pipe(gulp.dest('./artifacts'));
  }
}


