const
	/**/
	production = process.env.NODE_ENV === 'production'
	,development = process.env.NODE_ENV === 'development'
	/**/
	,path = require('path')
	,webpack = require('webpack')
	,HtmlWebpackPlugin = require('html-webpack-plugin')
	,ExtractTextPlugin = require('extract-text-webpack-plugin')
	// ,HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
	/*Write html files to hard disk even when using the webpack dev server or middleware*/
	// ,HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin')
	,BabiliPlugin = require('babili-webpack-plugin')
;

module.exports = {
	devtool: 'source-map',
	entry: {
		bundle: [__dirname + '/source/index.js'],
	},

	resolve: {
	  alias: {
	    // 'vue': 'vue/dist/vue.js',
			// 'tinymce': 'tinymce/tinymce',
	  }
	},

	output: {
		path: __dirname + '/public/',
		filename: 'js/[name].js',
		publicPath: '/public/',
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				// exclude: /node_modules/,
				use: [{
          loader: 'babel-loader',
          options: {
						presets: ['es2015']
					}
        }],
			},


			{
			  // HTML LOADER
			  test: /\.html$/,
			  loader: 'html-loader'
			},

			// {
	    //   test: /\.html$/,
	    //   loader: 'raw-loader'
	    // },

			{
			  //IMAGE LOADER
			  test: /\.(jpe?g|png|gif|svg)$/i,
			  loader:'file-loader',
				query: {
					name: './images/[name].[ext]',
				},
			},

			{
				test: /\.(css|less)$/,
				// exclude: /node_modules/,
				// loaders: ['style-loader', 'css-loader'],
				loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: [{
						loader: 'css-loader',
						options/*query*/: {
							// root: '.',
							// sourceMap: false,
							// modules: true,
						},
					},
					{loader: 'postcss-loader'},]
        }),
				// use: [
				// 	'style-loader',
				// 	{
				// 		loader: 'css-loader',
				// 		options: {
				// 			root: '.',
				// 			// modules: true,
				// 		},
				// 	}
				// ],
			},

			// {
			// 	// test: /\.(woff|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
			// 	test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
			// 	loader: 'base64-font-loader'
			// },

			{
				test   : /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
				loader : 'file-loader',
				query: {
					// name: './fonts/[name].[ext]',
					name: './fonts/[name]/[name].[ext]',
				},
      },

			// {
			// 	test: /\.(png|jpg|gif)$/,
			// 	loader: 'url-loader',
			// 	query: {
			// 		/*inline base64 URLs for <=8k images, direct URLs for the rest*/
			// 		// 'limit': '8192000',
			// 	}
			// },

			// {
      //   test: require.resolve('tinymce/tinymce'),
      //   loaders: [
      //     'imports?this=>window',
      //     'exports?window.tinymce'
      //   ]
      // },
			//
			// {
			// 	test: /tinymce\/plugins/,
			// 	loader: 'imports?tinymce,this=>{tinymce:tinymce}'
			// },
			//
      // {
      //   test: /tinymce\/(themes|plugins)\//,
			// 	exclude: /\.css$/,
      //   loaders: [
      //     'imports?this=>window'
      //   ]
      // },

		]
	},


	plugins: [

		new webpack.BannerPlugin(`build time for UNIX : ${Date.now()}`),

		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }

    }),

		new webpack.LoaderOptionsPlugin({
			options: {
				context: __dirname,
				postcss: [ // <---- postcss configs go here under LoadOptionsPlugin({ options: { ??? } })
						// require('postcss-cssnext'),
						require('postcss-nested'),
						// require('precss')({ /* options */ }).process(YOUR_CSS, {parser: require('postcss-scss') })
						// require('precss'),
						// require('postcss-scss'),
						// require('lost')(),
						// require('postcss-reporter')()
				]
					// ...other configs that used to directly on `modules.exports`
			}
		}),

		new HtmlWebpackPlugin(Object.assign({
				inject: 'body',
				filename: 'index.html',
				filetype: 'html',
				template: './source/index.html',
				alwaysWriteToDisk: true,
			}, production && {
				/*html-webpack-harddisk-plugin*/
				minify: {
					collapseWhitespace: true,
					removeComments: true,
					caseSensitive: true,
					// removeAttributeQuotes: true,
					// processScripts: [ 'text/ng-template' ],
				},
				// favicon:,
				// hash:,
				/*embed all javascript and css inline*/
				inlineSource: '.(js|css)$',
		})),

		// new HtmlWebpackHarddiskPlugin(),

		new ExtractTextPlugin({
      filename: 'css/[name].bundle.css',
      allChunks: true,
			/*disables the plugin*/
			disable: false,
    }),


    new webpack.optimize.CommonsChunkPlugin({
      // names: ['vendor'],
      // filename: '[name].js',
			 children: true,
			 async: true,
    }),

  ].concat(production ? [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false,
    //   },
    // }),
		new BabiliPlugin(),
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
    // hot: true,
    /*embed the webpack-dev-server runtime into the bundle. Defaults to false*/
    // inline: true,
    /*don't finish the grunt task. Use this in combination with the watch option*/
    // keepalive: true,
  },

};
