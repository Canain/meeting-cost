'use strict';

const precss = require('precss');
const autoprefixer = require('autoprefixer');

const node = {};

['fs', 'net'].forEach(m => {
	node[m] = 'empty';
});

module.exports = {
	entry: './src/browser/ts/main.ts',
	output: {
		filename: './www/bundle.js',
	},
	module: {
		loaders: [
			{
				loader: 'ts',
				test: /\.ts$/
			},
			{
				loader: 'json-loader',
				test: /\.json$/
			},
			{
				test: /\.css$/,
				loader: 'style-loader!css-loader!postcss-loader'
			}
		]
	},
	postcss: () => [precss, autoprefixer],
	node: node,
	devtool: 'source-map',
	resolve: {
		modulesDirectories: ['node_modules'],
		extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
	}
};
