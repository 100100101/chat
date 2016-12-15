const
	/**/
	PRODUCTION = process.env.NODE_ENV === 'production'
	,DEVELOPMENT = process.env.NODE_ENV === 'development'
	,BUILD = process.env.NODE_OUTPUT === 'build'
	,SERVER = process.env.NODE_OUTPUT === 'server'
	/**/
	,path = require('path')
	,webpack = require('webpack')
	,HtmlWebpackPlugin = require('html-webpack-plugin')
	,ExtractTextPlugin = require('extract-text-webpack-plugin')
	// ,HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
	/*Write html files to hard disk even when using the webpack dev server or middleware*/
	,HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
	// ,BabiliPlugin = require('babili-webpack-plugin')

	,postcssModules = [
		require('postcss-cssnext'),
		require('postcss-nested'),
			// require('precss')({ /* options */ }).process(YOUR_CSS, {parser: require('postcss-scss') })
			// require('precss'),
			// require('postcss-scss'),
			// require('lost')(),
		require('postcss-reporter')(),
	]
	,OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
;

module.exports = {
	devtool: /*'source-map'*/'eval',

	entry: {
		// 'vendor': ['tinymce/tinymce.jquery.js'],
		'bundle': ['./source/index.js'],
	},

	output: {
		path: __dirname + '/public/',
		filename: 'js/[name].js',
		publicPath: SERVER ? '/' : './',
	},

	resolve: {
	  alias: {
	    'vue$': 'vue/dist/vue.common.js',
			// 'tinymce$': 'tinymce/tinymce.jquery.js',
	  }
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				// exclude: /node_modules/,
				use: [{
					loader: 'babel-loader',
					options: {
						comments: false,
						presets: ['es2015'/*, 'stage-3'*/],
						plugins: ['transform-object-rest-spread', /*'transform-runtime',*/],
					}
				}],
			},

			{
				test: /\.css$/,
				// exclude: /node_modules/,
				loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [{
						loader: 'css-loader',
						options: {
							// root: '.',
							sourceMap: DEVELOPMENT,
							// minimize: true,
							// modules: true,
						},
					},
					{loader: 'postcss-loader'},]
        }),
			},

			{
				test: /\.vue$/,
				// exclude: /node_modules/,
				use: [
					{
						loader: 'vue-loader',
						options: {
							postcss: postcssModules,
						}
					},
				],
			},

			// HTML LOADER
			{
			  test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
					}
				]
			},

			// {
	    //   test: /\.html$/,
	    //   loader: 'raw-loader'
	    // },

			//IMAGE LOADER
			{
			  test: /\.(jpe?g|png|gif|svg)$/i,
				use: [
					{
						loader:'file-loader',
						options: {
							/**/
							publicPath: SERVER ? '/' : '../',
							// outputPath: '/images/',
							name: 'images/[name].[ext]',
						},
					},
				]
			},

			// {
			// 	test: /\.(png|jpg|gif)$/,
			// 	loader: 'url-loader',
			// 	query: {
			// 		/*inline base64 URLs for <=8k images, direct URLs for the rest*/
			// 		// 'limit': '',
			// 	}
			// },

			{
				test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: SERVER ? '/' : '../',
							name: 'fonts/[name]/[name].[ext]',
						},
					}
				],
			},

			// {
			// 	// test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			// 	test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			// 	loader: 'base64-font-loader'
			// },

		]
	},


	plugins: [
		new webpack.BannerPlugin(`build time for UNIX : ${new Date()}`),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),

		new webpack.LoaderOptionsPlugin({
			debug: true,
			vue: {
				loaders: {
					js: 'babel-loader?presets[]=es2015',
				},
			},

			options: {
				context: __dirname,
				postcss: postcssModules,
			}
		}),

		// new webpack.optimize.CommonsChunkPlugin({
		// 	names: ['vendor'],
		// 	filename: '[name].js',
		// 	minChunks: Infinity,
		// 	// children: true,
		// 	// async: true,
		// }),

		new HtmlWebpackPlugin(Object.assign({
				/*html-webpack-harddisk-plugin*/
				alwaysWriteToDisk: true,
				inject: 'body',
				filename: 'index.html',
				filetype: 'html',
				template: './source/index.html',
			}, PRODUCTION && {
				/*embed all javascript and css inline*/
				inlineSource: '.(js|css)$',
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					caseSensitive: true,
					// removeAttributeQuotes: true,
					// processScripts: [ 'text/ng-template' ],
				},
				// favicon:,
				// hash:,

		})),

		new HtmlWebpackHarddiskPlugin(),

		new ExtractTextPlugin({
      filename: 'css/[name].bundle.css',
      allChunks: true,
			/*disables the plugin*/
			disable: !(BUILD && PRODUCTION),
    }),


  ].concat(PRODUCTION ? [
		new OptimizeCssAssetsPlugin({
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		}),

    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
			minimize : true,
			sourceMap : false,
    }),

		// new BabiliPlugin(),
  	] : []
	),

	watch: true,
	watchOptions: {
		aggregateTimeout: 100,
	},

	devServer: {
    host: 'localhost',
    port: 8080,
    contentBase: /*path.join(__dirname, 'public')*/ __dirname + '/public/',
    /*adds the HotModuleReplacementPlugin and switch the server to hot mode. Use this in combination with the inline option*/
    hot: DEVELOPMENT,
    /*embed the webpack-dev-server runtime into the bundle. Defaults to false*/
    inline: DEVELOPMENT,
    /*don't finish the grunt task. Use this in combination with the watch option*/
    // keepalive: true,
  },

};
