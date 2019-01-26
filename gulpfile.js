var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useRef = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var minifyCSS = require('gulp-minify-css');


gulp.task('browserSync', function () {
    browserSync({
        server: {
            baseDir: 'src'
        }
    })
});

gulp.task('useref', function () {
    var assets = useref.assets();
    return gulp.src('src/*.js')
        .pipe(assets)
        .pipe(gulpIf('*.css', minifyCSS()))
        .pipe(gulpif('*.js', uglify()))
        .pipe(assets.restore())
        .pipe(useref())
        .pipe(gulp.dest('dist'))
});

gulp.task('scss', function () {
        return gulp.src('src/scss/main.scss')//считываем файл
            .pipe(sass())//применяем плагин к файлу; выполняем операции
            .pipe(gulp.dest('src/css'))//указываем куда сохранять
            .pipe(browserSync.reload({ //автоматическая перезагрузка браузера
                stream: true
            }));
    }
);

gulp.task('watch', ['browserSync'], function () {
        gulp.watch('src/scss/**/*.scss', ['scss']);
        gulp.watch('src/**/*.html', browserSync.reload);
    }
);

