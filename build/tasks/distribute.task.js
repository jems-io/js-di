module.exports = function configureGulp(gulp) {   
    gulp.task('distribute', getDistributePipe);
    gulp.task('distribute-cd', ['integrate'], getDistributePipe);

    function getDistributePipe() {
        return gulp.src(['./bin/src/**/*'])
                    .pipe(gulp.dest('./dist'))
    }
}