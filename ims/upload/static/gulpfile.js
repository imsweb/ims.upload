var minify = require('gulp-minify');
var gulp = require('gulp');
var concat = require('gulp-concat');

gulp.task('compress', function () {
    gulp.src(['blueimp/js/load-image.js',
              'blueimp/js/canvas-to-blob.min.js',
              'blueimp/js/jquery.iframe-transport.js',
              'blueimp/js/jquery.fileupload.js',
              'blueimp/js/process.js',
              'blueimp/js/image.js',
              'blueimp/js/validate.js',
              'blueimp/js/ui.js',
              'upload.js'])
        .pipe(minify({
            ext: {
                src: '.js'
            }
        }))
        .pipe(concat('compiled.js'))
        .pipe(gulp.dest('.'))
});