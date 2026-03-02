const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('js', () => {
    return gulp.src('src/**/*.js')
    .pipe(babel({
        presets: [
            ['@babel/preset-env', { targets: '> 0.25%, not dead' }],
            '@babel/preset-flow',
            '@babel/preset-react'
        ],
        plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            '@babel/plugin-proposal-class-properties'
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

gulp.task('build', gulp.parallel('js', 'scss'));

gulp.task('dev', gulp.series('build', () => {
    gulp.watch('src/**/*.js', gulp.series('js'));
    gulp.watch('src/**/*.scss', gulp.series('scss'));
}));