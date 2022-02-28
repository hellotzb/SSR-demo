module.exports = {
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  targets: {
                    browsers: ['last 2 versions'],
                  },
                },
              ],
            ],
          },
        },
      },
      // 服务端渲染使用style-loader会报错，因为node环境没有window对象，需要使用isomorphic-style-loader
      // isomorphic-style-loader不会将样式放在头部header中，因此如果禁用js将无法应用样式，解决：somorphic-style-loader 的github上有解决方案
      {
        test: /\.(css|less)$/,
        use: [
          'isomorphic-style-loader',
          {
            loader: 'css-loader',
            options: {
              // 在css中通过import引入之前引用的loader数目
              // 0 => no loaders (default);
              // 1 => less-loader;
              // 2 => less-loader，postcss-loader;
              importLoaders: 2,
              // 开启css module模块化打包
              modules: {
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
              },
              // 坑！！解决资源路径为[object Module]的问题
              esModule: false,
            },
          },
          'less-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer', // 自动添加厂商前缀
                    {
                      // 选项
                    },
                  ],
                ],
              },
            },
          },
        ],
      },
    ],
  },
};
