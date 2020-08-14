const path = require('path')


const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin') // 压缩css

const HappyPack = require('happypack') // 多核
const os = require('os')
const UglifyJsPlugin = require(' uglifyjs-webpack-plugin ') // 压缩js
// 开辟一个线程池
// 拿到系统CPU的最大核数，happypack 将编译工作灌满所有线程
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

console.info('webpack---------配置启动')

module.exports = {
    module: {
        rules: [
            {
                test: /\.(js | vue)$/,
                use: ['cache-loader', 'babel-loader'],
                include: path.resolve('src'),
                exclude: /(node_modules | static)/
            },
            {
                test: /\.(sa|sc|c)ss$/,
                exclude: /(node_modules | static)/,
                use: [
                    process.env.NODE_ENV === 'development'
                        ? 'style-loader'
                        : MiniCssExtractPlugin.loader,
                    'happypack/loader?id=css'
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules | static)/,
                include: path.resolve('src'),
                use: 'happy/loader?id=js' // 此处将之前配置的babel的一些预设什么的替换为happy/loader。id=js，因为happy也可以打包css,
            }
        ],
        plugins:
          process.env.NODE_ENV === 'development'
              ? []
              : [
                  new MiniCssExtractPlugin({
                      exclude: /(node_modules | static)/,
                      filename: '[name][hash].css',
                      chunkFilename: '[id][hash].css'
                  }),
                  new HappyPack({
                      exclude: /(node_modules | static)/,
                      id: 'js',
                      threadPool: happyThreadPool,
                      loaders: [
                          {
                              loader: 'babel-loader'
                          }
                      ]
                  }),
                  new HappyPack({
                      exclude: /(node_modules | static)/,
                      id: 'css',
                      threadPool: happyThreadPool,
                      loaders: ['cache-loader', 'css-loader', 'postcss-loader']
                  })
              ],
        optimization:
          process.env.NODE_ENV === 'development'
              ? {}
              : {
                  minimizer: [
                      new UglifyJsPlugin({
                          test: /\.js(\?.*)?$/i, // 测试匹配文件,
                          include: /src/, // 包含哪些文件
                          excluce: /(node_modules | static)/, // 不包含哪些文件

                          // 允许过滤哪些块应该被uglified（默认情况下，所有块都是uglified）。
                          // 返回true以uglify块，否则返回false。
                          chunkFilter: chunk => {
                          // `vendor` 模块不压缩
                              if (chunk.name === 'vendor') {
                                  return false
                              }
                              return true
                          },
                          cache: true,
                          parallel: true,
                          uglifyOptions: {
                              compress: {
                                  arrows: false,
                                  booleans: false,
                                  cascade: false,
                                  collapse_vars: false,
                                  comparisons: false,
                                  computed_props: false,
                                  hoist_funs: false,
                                  hoist_props: false,
                                  hoist_vars: false,
                                  if_return: false,
                                  inline: false,
                                  join_vars: false,
                                  keep_infinity: true,
                                  loops: false,
                                  negate_iife: false,
                                  properties: false,
                                  reduce_funcs: false,
                                  reduce_vars: false,
                                  sequences: false,
                                  side_effects: false,
                                  switches: false,
                                  top_retain: false,
                                  toplevel: false,
                                  typeofs: false,
                                  unused: false,

                                  // 除非声明了正在使用生产版本的react-devtools，
                                  // 否则关闭所有类型的压缩。
                                  conditionals: true,
                                  dead_code: true,
                                  evaluate: true
                              },
                              mangle: true
                          }
                      }),
                      new OptimizeCSSAssetsPlugin({
                          exclude: /(node_modules | public)/
                      })
                  ]
              }
    }
}
