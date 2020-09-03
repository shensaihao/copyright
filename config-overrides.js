const {
    override,
    fixBabelImports,
    addLessLoader,
    addPostcssPlugins
} = require('customize-cra');
const rewireStyl = require("react-app-rewire-stylus-modules");
const rewireReactHotLoader = require('react-app-rewire-hot-loader')
const { alias } = require('react-app-rewire-alias')
process.env.GENERATE_SOURCEMAP = process.env.NODE_ENV === 'development' ? 'true' : 'false';


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
        libraryName: 'antd',
        style: true, // change importing css to less
    }),
    addLessLoader({
        lessOptions: {
            javascriptEnabled: true,
            modifyVars: { '@primary-color': '#0665CE'}
        }
    }),
    addPostcssPlugins([
        require("postcss-normalize")({
            "forceImport": true
        }),
        require("postcss-preset-env")({
            "stage": 0
        }),
    ]),
);
