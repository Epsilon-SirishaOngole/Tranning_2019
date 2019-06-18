var gulp = require('gulp');
var rename = require('gulp-rename');
var browserfiy = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var browsersync = require('browser-sync');

var styleWatch = "src/css/**/*.css";
var styleSRC = 'src/css/style.css';
var styleDIST = './dist/css/';

var jsSRC = 'script.js';
var jsFolder = 'src/js/';
var jsDIST = './dist/js/';
var jsFILES = [jsSRC];
var jsWatch = "src/js/**/*.js"

gulp.task('browser-sync', function () {
    browsersync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('style', function (done) {
   gulp.src( styleSRC )
        .pipe( rename({ suffix: '.min' }))
        .pipe(gulp.dest(styleDIST));
    done();
});

gulp.task('js', function (done) {
    jsFILES.map(function (entry) {
        return browserfiy({
            entries: [jsFolder + entry]
        }).transform(babelify, { presets: [ 'env']})
            .bundle()
            .pipe(source(entry))
            .pipe(rename({ extname: '.min.js' }))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest(jsDIST))
    });
    done();
});

gulp.task('default', gulp.parallel(['js', 'style'], function (done) {
    done();
}));


gulp.task('watch', gulp.series(['default'], function (){
    gulp.watch(styleWatch, gulp.series('style'));
    gulp.watch(jsWatch, gulp.series('js'));
}));