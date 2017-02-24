const gulp = require('gulp');
const sass = require('gulp-sass');
const watch = require('gulp-watch');
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');

// production
gulp.task('build', ['js', 'scss']);

gulp.task('js', () => {
    return gulp.src('src/**/*.js')
        .pipe(babel({
            presets: [
                'es2015',
                'react'
            ]
        }))
        .pipe(gulp.dest('dist'));
});

gulp.task('scss', () => {
    return gulp.src('./src/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist'));
});

gulp.task('dev', () => {
    gulp.watch('./src/**/*.scss', ['scss']);
    gulp.watch('./src/**/*.js', ['js']);
});