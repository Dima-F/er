var gulp = require('gulp');
var run = require('gulp-run');
var asar = require('gulp-asar');
var clean = require('gulp-clean');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var jetpack = require('fs-jetpack');
var projectDir = jetpack;
var srcDir = projectDir.cwd('./app');
var destDir = projectDir.cwd('./build');


gulp.task('clean', function (callback) {
  return destDir.dirAsync('.', { empty: true });
});

gulp.task('copy', ['clean'], function () {
  return projectDir.copyAsync('app', destDir.path(), {
    overwrite: true, matching: [
      './node_modules/**/*',
      './fonts/**/*',
      '*.html',
      '*.css',
      '*.js',
      'package.json',
      'package-lock.json',
      '!./bower_components/**/*'
    ]
  });
});

gulp.task('build', ['copy'], function () {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      js: [uglify()]
    }))
    .pipe(gulp.dest('build/'));
}); 

gulp.task('run', function () {
  return run('npm start').exec();
});

gulp.task('electron',function(){
  return run('npm run build-electron').exec();
});

gulp.task('build-electron',['build','electron']);
