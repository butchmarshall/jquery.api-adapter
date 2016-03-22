var fs = require('fs'),
concat = require('gulp-concat'),
rename = require('gulp-rename'),
umd = require('gulp-umd'),
uglify = require('gulp-uglify'),
gulp = require('gulp');

gulp.task('default', [
  'minify'
]);

gulp.task('watch', function() {
	gulp.watch('./src/**/*', ['default']);
});

gulp.task('minify', function() {
	gulp.src([
		'./src/*.js'
	])
	.pipe(concat('jquery.api-adapter.js'))
	.pipe(umd({
		dependencies: function() {
			return [
				{
					name: 'jQuery',
					cjs: 'jquery',
					amd: 'jquery',
					global: 'jQuery'
				},
				{
					name: 'jquery-request',
					cjs: 'jquery.request',
					amd: 'jquery.request',
					param: 'Request',
					global: 'jQuery.Request'
				}
			]
		},
		exports: function() {
			return 'jQuery.Api';
		},
		namespace: function() {
			return 'jQuery';
		}
	}))
	.pipe(gulp.dest('./dist/'))
	.pipe(uglify())
	.pipe(rename('jquery.api-adapter.min.js'))
	.pipe(gulp.dest('./dist/'));
});