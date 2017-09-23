const gulp = require('gulp');
const ts = require('gulp-typescript');
const mocha = require('gulp-mocha');
const clean = require('gulp-clean');
const zip = require('gulp-zip');
const ftp = require( 'vinyl-ftp' );
const gutil = require('gulp-util');

var tsProject = ts.createProject('./tsconfig.json');

// =========================================================================
//                         Transpilation Tasks
// =========================================================================

gulp.task('trasnpile-source', function () {
    return gulp.src('./src/**/*')
                .pipe(tsProject())
                .on('error', function() { this.on("finish", () => process.exit(1)); })
                .js
                .pipe(gulp.dest('./bin/src'))                
});

gulp.task('create-source-definition', ['trasnpile-source'], function () {
    return gulp.src('./src/**/*')
                .pipe(tsProject())
                .dts
                .pipe(gulp.dest('./bin/src'));
});

gulp.task('transpile', ['create-source-definition'], function() {
    console.log('=========================================');
    console.log('  Source code and definition transpiled');
    console.log('=========================================');
});

// =========================================================================
//                              Test Tasks
// =========================================================================

gulp.task('trasnpile-test', ['transpile'], function () {
    return gulp.src(['./test/**/*'])
                .pipe(tsProject())
                .on('error', function() { this.on("finish", () => process.exit(1)); })
                .js
                .pipe(gulp.dest('./bin/test'))
});

gulp.task('run-test', ['trasnpile-test'], function () {
    return gulp.src(['./bin/test/testStarter.js' , './bin/test/**/*.Spec.js'])
               .pipe(mocha());
});

gulp.task('clean-test', ['run-test'], function () {
  return gulp.src('./test_transpiled', {read: false})
    .pipe(clean());
});

gulp.task('test', ['run-test'], function() {
    console.log('=========================================');
    console.log('            Test performed');
    console.log('=========================================');
});

// =========================================================================
//                              Zip Tasks
// =========================================================================
 
gulp.task('zip-distribution', function () {
    return gulp.src('./bin/src/*')
               .pipe(zip('distribution.zip'))
               .pipe(gulp.dest('./'));

    
});

gulp.task('zip', ['zip-distribution'], function() {
    console.log('=========================================');
    console.log('            Distribution Zipped');
    console.log('=========================================');
});

// =========================================================================
//                              FTP upload Tasks
// =========================================================================
 
gulp.task('ftp-upload', function () {

    function getArgumentValue(argumentName, throwIfMiss) {
        var flagIndex = process.argv.indexOf(argumentName);

        if (flagIndex < 0)
            if (throwIfMiss === true)
                throw Error(`The argument ${argumentName} was not provided.`);
            else
                return undefined;
        if (flagIndex >= (flagIndex.lenght - 2)) throw Error(`The valu of the argument ${argumentName} was not provided.`);
        
        return process.argv[flagIndex + 1];
    }
    
    var conn = ftp.create( {
        host: getArgumentValue('--host', true),
        user: getArgumentValue('--user', true),
        pass: getArgumentValue('--password', true),
        parallel: 5
    } );
  
    return gulp.src([getArgumentValue('--sourcePath', true)], { base: '.', buffer: false })       
        .pipe(conn.dest(getArgumentValue('--remotePath', true)));
});
 