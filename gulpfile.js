const gulp = require('gulp');
const sass = require('gulp-sass');
const terser = require('gulp-terser');
const htmlmin = require('gulp-htmlmin');

sass.compiler = require('node-sass');

const buildSCSS = (cb) => {
	gulp.src('./src/scss/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./public/assets/css'));

	cb();
};

const buildJS = (cb) => {
	gulp.src('./src/js/**/*.js')
		.pipe(terser())
		.pipe(gulp.dest('./public/assets/js'));

	cb();
};

const buildHTML = (cb) => {
	gulp.src('./src/html/**/*.html')
		.pipe(htmlmin({ collapseWhitespace: true }))
		.pipe(gulp.dest('./public/'));

	cb();
};

exports.watch = () => {
	gulp.watch('./src/scss/**/*.scss', {events: 'all', ignoreInitial: false}, buildSCSS);
	gulp.watch('./src/js/**/*.js', {events: 'all', ignoreInitial: false}, buildJS);
	gulp.watch('./src/html/**/*.html', {events: 'all', ignoreInitial: false}, buildHTML);
};

