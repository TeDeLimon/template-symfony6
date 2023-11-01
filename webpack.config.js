const Encore = require('@symfony/webpack-encore');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or subdirectory deploy
    //.setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/app.ts')
    .addEntry('utils', './assets/typescript/Utils/utils.ts')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableBuildNotifications()
    .enableSourceMaps(!Encore.isProduction())
    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // configure Babel
    // .configureBabel((config) => {
    //     config.plugins.push('@babel/a-babel-plugin');
    // })

    // enables and configure @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = '3.23';
    })

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    .enableTypeScriptLoader()

    // uncomment if you use React
    //.enableReactPreset()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    //.enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()

    // enable CSS post-processing tool 
    .enablePostCssLoader()

    .addPlugin(new ImageMinimizerPlugin({
        generator: [
            {
                type: "asset",
                preset: "webp",
                implementation: ImageMinimizerPlugin.imageminGenerate,
                options: {
                    plugins: ["imagemin-webp"],
                }
            },
        ],
        minimizer: {
            implementation: ImageMinimizerPlugin.sharpMinify,
            options: {
                encodeOptions: {
                    // Your options for `sharp`
                    // https://sharp.pixelplumbing.com/api-output
                    jpeg: {
                        quality: 72,
                        mozjpeg: true
                    },
                    png: {
                        quality: 72,
                    },
                    webp: {
                        quality: 80,
                    }
                }
            }
        },
    }))

    // Set the path the files are copied to
    .copyFiles({
        from: './assets/images',
        pattern: /\.(png|jpg|jpeg|webp)$/,
        // to path is relative to the build directoryº
        to: 'images/[path][name].[ext]'
    })

    // Set the path the files are copied to
    .copyFiles({
        from: './assets/videos',
        pattern: /\.(mp4)$/,
        // to path is relative to the build directoryº
        to: 'videos/[path][name].[ext]'
    })

    ;

module.exports = Encore.getWebpackConfig();
