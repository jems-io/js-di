const gulp = require('gulp')
const gutil = require('gulp-util') // I'm not using util, but it looks that is, must be required.

require('./build/tasks/transpile.task')(gulp)
require('./build/tasks/test.task')(gulp)
require('./build/tasks/lint.task')(gulp)
require('./build/tasks/integrate.task')(gulp)
require('./build/tasks/distribute.task')(gulp)
require('./build/tasks/zip.task')(gulp)
require('./build/tasks/release.task')(gulp)
require('./build/tasks/deploy.task')(gulp)
