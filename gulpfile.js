const gulp = require('gulp');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const autoprefixer = require('gulp-autoprefixer');




gulp.task('build', ['js', 'scss']);


gulp.task('js', () => {
    return gulp.src('src/**/*.js')
    .pipe(babel({
        presets: [
            'es2015',
            'react',
            'stage-0'
        ]
    }))
    .pipe(gulp.dest('dist'));
});


gulp.task('scss', () => {
    return gulp.src('src/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('dist'));
});

gulp.task('dev', ['js', 'scss'], () => {
    gulp.watch('src/**/*.js', ['js']);
    gulp.watch('src/**/*.scss', ['scss']);
});