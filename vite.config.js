import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
import eslint from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import { resolve } from 'path';
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return defineConfig({
    plugins: [
      eslint({ cache: false }),
      svgLoader(),
      vue(),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    server: {
      https: true,
      proxy: {
        '/_AMapService': {
          target: 'https://preview.abyssal.site',
          changeOrigin: true,
        },
      },
    },
    build: {
      sourcemap: true,
    },
  });
};
