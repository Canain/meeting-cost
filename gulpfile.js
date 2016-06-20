'use strict';

const gulp = require('gulp');
const webpack = require('webpack-stream');
const ts = require('gulp-typescript');
const merge = require('merge2');
const gls = require('gulp-live-server');
const runSequence = require('run-sequence');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');

gulp.task('webpack', () => {
	return gulp.src('src/browser/ts/main.ts')
		.pipe(webpack(require('./webpack.config.js')).on('error', console.error))
		.pipe(gulp.dest('./'));
});

gulp.task('webpack-prod', () => {
	return gulp.src('src/browser/ts/main.ts')
		.pipe(webpack(require('./webpack.prod.config.js')))
		.pipe(gulp.dest('./'));
});

gulp.task('uglify-prod', () => {
	return gulp.src('www/bundle.js').pipe(uglify({
		mangle: true,
		compress: true
	})).pipe(gulp.dest('www'));
});

gulp.task('build-prod', done => {
	runSequence('webpack-prod', 'uglify-prod', done);
});

const server = gls('server/js/src/server/ts/server.js', {
	env: {
		NODE_ENV: 'development'
	}
}, 5000);

gulp.task('ts', () => {
	const tsProject = ts.createProject('src/server/ts/tsconfig.json');
	const tsResult = tsProject.src().pipe(ts(tsProject));
	return merge([
		tsResult.dts.pipe(gulp.dest('server/dts')),
		tsResult.js.pipe(gulp.dest('server/js'))
	]);
});

gulp.task('html', () => {
	return gulp.src('src/browser/html/**/*.html')
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest('www'));
});

gulp.task('serve', ['ts'], () => {
	server.start();
});

gulp.task('watch-serve', ['serve', 'html'], () => {
	gulp.watch('src/server/ts/**/*.ts', ['serve']);
	gulp.watch('src/browser/html/**/*.html', ['html']);
	gulp.watch('www/**/*', (file) => {
		server.notify.bind(server)(file);
	});
});

gulp.task('watch', ['watch-serve', 'webpack']);

gulp.task('default', ['watch']);