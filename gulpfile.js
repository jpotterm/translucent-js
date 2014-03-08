var gulp = require("gulp");

var jshint = require("gulp-jshint");
var browserify = require("gulp-browserify");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var jasmine = require("gulp-jasmine");


gulp.task("lint", function() {
    gulp.src(["src/**/*.js", "test/**/*.js"])
        .pipe(jshint())
        .pipe(jshint.reporter("default"));
});


gulp.task("test", function () {
    gulp.src("test/**/*.js")
        .pipe(jasmine());
});

gulp.task("combine", function() {
    gulp.src("src/index.js")
        .pipe(browserify({
            standalone: "tlc"
        }))
        .pipe(rename("translucent.js"))
        .pipe(gulp.dest("dist"))
        .pipe(rename("translucent.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("dist"))
});

gulp.task("default", ["lint", "test", "combine"]);
