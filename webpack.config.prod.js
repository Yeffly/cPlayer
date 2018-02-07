var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


const GLOBALS = {
    'process.env.NODE_ENV': JSON.stringify('production'),
    'process.env.cplayer_noview': JSON.stringify(!!process.env.noview),
    __DEV__: false
};

module.exports = {
    
    entry: [
        "./src/lib/index.ts"
    ],
    output: {
        filename: "cplayer" + (process.env.suffix || '') + ".js",
        path: __dirname + "/dist",
        library: 'cplayer-umd',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    plugins: [
        !!process.env.analyzer ? new BundleAnalyzerPlugin() : undefined,
        new webpack.DefinePlugin(GLOBALS),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
    ].filter(function(e){return e}),

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        strictExportPresence: true,
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: [
                    {
                        loader: "awesome-typescript-loader",
                        options: {
                            useBabel: true
                        }
                    }
                ]
            },
            {
                test: /\.(scss)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {}
                    },
                    {
                        loader: "sass-loader",
                        options: {
                        }
                    }
                ]
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }
            },
            {
                test: /\.(less)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {}
                    },
                    {
                        loader: "less-loader",
                        options: {
                        }
                    }
                ]
            },
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: "css-loader",
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(ttf|otf|woff|woff2|eot)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192
                    }
                }]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: path.resolve(__dirname, "node_modules"),
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ],
            },
            {
                test: /\.svg$/, use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true
                    }
                }]
            },
            {
                test: /\.js$/,
                enforce: "pre",
                use: [{ loader: 'source-map-loader' }]
            }
        ]
    }
}