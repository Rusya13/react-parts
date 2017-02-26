const gulp         = require( 'gulp' );
const sass         = require( 'gulp-sass' );
const watch        = require( 'gulp-watch' );
const babel        = require( 'gulp-babel' );
const typescript   = require( 'typescript' );
const ts           = require( 'gulp-typescript' );
const gulpAutoprefixer = require( 'gulp-autoprefixer' );
const autoprefixer = require( 'autoprefixer' );
var syntax = require('postcss-scss');
const nested       = require( 'postcss-nested' );
const postcss      = require( 'gulp-postcss' );

let project = ts.createProject( 'tsconfig.json', { typescript: typescript } );

// production
//gulp.task( 'build', [ 'js', 'scss' ] );
gulp.task( 'build', [ 'compile', 'scss' ] );

gulp.task( 'js', () => {
    return gulp.src( 'src/**/*.js' )
    .pipe( babel( {
        presets: [
            'es2015',
            'react'
        ]
    } ) )
    .pipe( gulp.dest( 'dist' ) );
} );


gulp.task( 'compile', function () {
    let result = gulp
    .src( 'src/**/*{ts,tsx}' )
    .pipe( project() );
    return result.js.pipe( gulp.dest( 'dist' ) );
} );


gulp.task( 'scss', () => {
    return gulp.src( './src/style.scss' )
    .pipe( sass().on( 'error', sass.logError ) )
    .pipe( gulpAutoprefixer() )
    .pipe( gulp.dest( './dist' ) );
} );

gulp.task( 'postcss', function () {
    let plugins = [ nested,
           autoprefixer({browsers: ['last 2 versions']})
        ];
    return gulp.src( './src/style.scss' )
    .pipe( postcss( plugins ) )
    .pipe( gulp.dest( './dist' ) );
} );


gulp.task( 'dev', () => {
    gulp.watch( './src/**/*.scss', [ 'scss' ] );
    gulp.watch( './src/**/*.js', [ 'js' ] );
    gulp.watch( './src/**/*{ts, tsx}', [ 'compile' ] );
} );