var gulp = require('gulp');
var browserSync = require('browser-sync');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var jshint = require('gulp-jshint');

gulp.task('reload', function(){
    browserSync.reload();
});

gulp.task('default', function(){
    console.log('domyslne zadanie');
});

gulp.task('serve', ['sass'], function(){
    browserSync({
        server: 'src'
    });
    
    gulp.watch('src/*.html', ['reload']);
    gulp.watch('src/scss/**/*.scss', ['sass']);
});

gulp.task('sass', function(){
    return gulp.src('src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({errLogToConsle:true}))
        .pipe(sass({outputStyle: 'expanded'}))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

gulp.task('dev', function(){
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});



gulp.task('default', ['serve', 'dev']);

