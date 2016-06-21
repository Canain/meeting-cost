'use strict';

const webpack = require('webpack');

const config = require('./webpack.common.js');

config.watch = true,

module.exports = config;
