var gulp = require('gulp');
var bower = require('gulp-bower');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var aspnetk = require("gulp-aspnet-k");
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var gutil = require('gulp-util');
var plumber = require('gulp-plumber');
var colors = require('colors');

gulp.task('bower', function() {
  return bower({cmd:'install', production:true})
    .pipe(gulp.dest('wwwroot/lib/'))
});

gulp.task('less', function() {
    gulp.src('./css/**/main.less')
        .pipe(plumber({ errorHandler: onError    }))
        .pipe(sourcemaps.init())
        .pipe(less({compress: true}))
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('./wwwroot/css/'));
    
});

gulp.task('watch', ['less'], function () {
    gulp.watch('./css/**/*.less', ['less'])
});

gulp.task('aspnet-run', aspnetk({restore: false}));

gulp.task('optimiseimages', function() {
    return gulp.src('./wwwroot/images/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./wwwroot/images/'));
});

gulp.task('default', ['watch', 'aspnet-run']);


var onError = function (err) {  
  gutil.beep();
  console.error(err.message.red);
};
