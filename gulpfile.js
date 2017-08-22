var gulp = require('gulp');
var run = require('gulp-run');
var childProcess = require('child_process');

// create the gulp task
gulp.task('run', function () {
  //return run('electron-rebuild -f -w sqlite3 ./app/main.js').exec();
  return run('electron ./app').exec();
});