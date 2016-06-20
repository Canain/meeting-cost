const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
	entry: './src/browser/ts/main.ts',
	output: {
		filename: './www/bundle.js',
	},
	module: {
		loaders: [
			{
				test: /\.ts$/,
				loader: 'ts'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!postcss-loader'
			}
		]
	},
	node: {
		fs: 'empty'
	},
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	}
};