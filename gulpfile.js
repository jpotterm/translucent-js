var gulp = require('gulp');

var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    gulp.src('src/index.js')
        .pipe(browserify({
            standalone: 'tlc'
        }))
        .pipe(rename('translucent.js'))
        .pipe(gulp.dest('dist'))
        .pipe(rename('translucent.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist'))
});

// Default Task
gulp.task('default', ['lint', 'scripts']);
