const webpack = require('webpack');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

module.exports = {
	watch: true,
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
	postcss: () => [precss, autoprefixer],
	node: {
		fs: 'empty'
	},
	devtool: 'source-map',
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	}
};