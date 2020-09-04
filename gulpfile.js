var gulp = require('gulp');
var uglify = require('gulp-uglify-es').default;
var rename = require('gulp-rename');

gulp.task('default', function () {
    return gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest('dist/'))
});