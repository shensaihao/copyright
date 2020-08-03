const {
    override,
    fixBabelImports,
    addLessLoader,
} = require('customize-cra');
const rewireStyl = require("react-app-rewire-stylus-modules");
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const { alias } = require('react-app-rewire-alias')

function myOverrides(config, env) {
    alias({
        '@/*': 'src/*',
    })(config)
    config = rewireStyl(config, env);
    config = rewireReactHotLoader(config);
    return config;
}

module.exports = override(
    myOverrides,
    fixBabelImports('import', {
        libraryName: 'antd', style: 'css', // change importing css to less
    }),
    addLessLoader({
        javascriptEnabled: true,
        // modifyVars: { '@primary-color': '#fdebeb' },
    }),
);
