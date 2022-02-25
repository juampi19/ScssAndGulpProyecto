//Sass y CSS
const { watch, dest, src, series } = require( 'gulp' );
const sass = require( 'gulp-sass' )( require( 'sass' ) );
const postcss = require( 'gulp-postcss' );
const autoprefixer = require( 'autoprefixer' );
const plumber = require( 'gulp-plumber' );
const sourcemaps = require( 'gulp-sourcemaps' );
const cssnano = require( 'cssnano' );

//Imagenes
const imagen = require( 'gulp-imagemin' );
const avif = require( 'gulp-avif' );
const webp = require( 'gulp-webp' );


function css( done ) {
    src( 'src/scss/app.scss' )
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( sass() )
        .pipe( postcss( [ autoprefixer(), cssnano() ] ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( dest( 'build/css' ) )

    done();
}


function imagenes( done ) {
    src( 'src/img/**/*' )
        .pipe( imagen( { optimizationLevel: 3 } ) )
        .pipe( dest( 'build/img' ) )

        done();
}

function versionAvif( done ) {
    const opciones = {
        quality: 50
    }
    src( 'src/img/**/*.{pgn,jpg}')
        .pipe( avif( opciones ) )
        .pipe( dest( 'build/img' ) );

    done();
}

function versionWebp( done ) {
    const opciones = {
        quality: 50
    }

    src( 'src/img/**/*.{pgn,jpg}' )
        .pipe( webp( opciones ) )
        .pipe( dest( 'build/img' ) );

    done(); 
}


function dev( done ) {
    watch( 'src/scss/**/*.scss', css );
    watch( 'src/img/**/*', imagenes );

    done();
}


exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.versionAvif = versionAvif;
exports.versionWebp = versionWebp;
exports.default = series( versionWebp, versionAvif, imagenes ,css, dev );
