// ../client/vite.config.ts
import { defineConfig } from "file:///C:/github/wiz-monopoly/node_modules/vite/dist/node/index.js";
import react from "file:///C:/github/wiz-monopoly/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///C:/github/wiz-monopoly/node_modules/dotenv/lib/main.js";
import path from "path";
import svgr from "file:///C:/github/wiz-monopoly/node_modules/vite-plugin-svgr/dist/index.mjs";
var __vite_injected_original_dirname = "C:\\github\\wiz-monopoly\\packages\\client";
dotenv.config();
var vite_config_default = defineConfig(({ command, mode, ssrBuild }) => {
  const baseConfig = {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import 'styles/vars'; @import 'styles/mixins';`
        }
      }
    },
    plugins: [react(), svgr()],
    resolve: {
      alias: {
        api: path.join(__vite_injected_original_dirname, "./src/api"),
        app: path.join(__vite_injected_original_dirname, "./src/app"),
        assets: path.join(__vite_injected_original_dirname, "./src/assets"),
        components: path.join(__vite_injected_original_dirname, "./src/components"),
        constants: path.join(__vite_injected_original_dirname, "./src/constants"),
        core: path.join(__vite_injected_original_dirname, "./src/core"),
        features: path.join(__vite_injected_original_dirname, "./src/features"),
        game: path.join(__vite_injected_original_dirname, "./src/game"),
        helpers: path.join(__vite_injected_original_dirname, "./src/helpers"),
        hooks: path.join(__vite_injected_original_dirname, "./src/hooks"),
        layouts: path.join(__vite_injected_original_dirname, "./src/layouts"),
        models: path.join(__vite_injected_original_dirname, "./src/models"),
        pages: path.join(__vite_injected_original_dirname, "./src/pages"),
        styles: path.join(__vite_injected_original_dirname, "./src/styles"),
        translations: path.join(__vite_injected_original_dirname, "./src/translations"),
        types: path.join(__vite_injected_original_dirname, "./src/types"),
        data: path.join(__vite_injected_original_dirname, "./src/data")
      }
    }
  };
  if (command === "serve") {
    return {
      ...baseConfig,
      define: {
        __SERVER_PORT__: process.env.SERVER_PORT
      },
      server: {
        port: Number(process.env.CLIENT_PORT) || 3e3
      }
    };
  } else {
    if (ssrBuild) {
      return {
        ...baseConfig,
        build: {
          lib: {
            entry: path.resolve(__vite_injected_original_dirname, "./src/ssr.tsx"),
            name: "Client",
            fileName: "client",
            formats: ["cjs"]
          },
          rollupOptions: {
            input: {
              main: "./index-ssr.html"
            },
            output: {
              dir: "./dist-ssr"
            }
          }
        }
      };
    } else {
      return {
        build: {
          manifest: true,
          rollupOptions: {
            input: {
              main: "./index-ssr.html"
            },
            output: {
              dir: "./dist"
            }
          }
        },
        ...baseConfig
      };
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcZ2l0aHViXFxcXHdpei1tb25vcG9seVxcXFxwYWNrYWdlc1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGdpdGh1YlxcXFx3aXotbW9ub3BvbHlcXFxccGFja2FnZXNcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9naXRodWIvd2l6LW1vbm9wb2x5L3BhY2thZ2VzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmRvdGVudi5jb25maWcoKTtcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcbmltcG9ydCBzdmdyIGZyb20gJ3ZpdGUtcGx1Z2luLXN2Z3InO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGNvbW1hbmQsIG1vZGUsIHNzckJ1aWxkIH0pID0+IHtcclxuICBjb25zdCBiYXNlQ29uZmlnID0ge1xyXG4gICAgY3NzOiB7XHJcbiAgICAgIHByZXByb2Nlc3Nvck9wdGlvbnM6IHtcclxuICAgICAgICBzY3NzOiB7XHJcbiAgICAgICAgICBhZGRpdGlvbmFsRGF0YTogYEBpbXBvcnQgJ3N0eWxlcy92YXJzJzsgQGltcG9ydCAnc3R5bGVzL21peGlucyc7YCxcclxuICAgICAgICB9LFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICAgIHBsdWdpbnM6IFtyZWFjdCgpLCBzdmdyKCldLFxyXG4gICAgcmVzb2x2ZToge1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIGFwaTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2FwaScpLFxyXG4gICAgICAgIGFwcDogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2FwcCcpLFxyXG4gICAgICAgIGFzc2V0czogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2Fzc2V0cycpLFxyXG4gICAgICAgIGNvbXBvbmVudHM6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9jb21wb25lbnRzJyksXHJcbiAgICAgICAgY29uc3RhbnRzOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvY29uc3RhbnRzJyksXHJcbiAgICAgICAgY29yZTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2NvcmUnKSxcclxuICAgICAgICBmZWF0dXJlczogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2ZlYXR1cmVzJyksXHJcbiAgICAgICAgZ2FtZTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2dhbWUnKSxcclxuICAgICAgICBoZWxwZXJzOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvaGVscGVycycpLFxyXG4gICAgICAgIGhvb2tzOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvaG9va3MnKSxcclxuICAgICAgICBsYXlvdXRzOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvbGF5b3V0cycpLFxyXG4gICAgICAgIG1vZGVsczogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL21vZGVscycpLFxyXG4gICAgICAgIHBhZ2VzOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvcGFnZXMnKSxcclxuICAgICAgICBzdHlsZXM6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9zdHlsZXMnKSxcclxuICAgICAgICB0cmFuc2xhdGlvbnM6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy90cmFuc2xhdGlvbnMnKSxcclxuICAgICAgICB0eXBlczogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL3R5cGVzJyksXHJcbiAgICAgICAgZGF0YTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2RhdGEnKSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgfTtcclxuXHJcbiAgaWYgKGNvbW1hbmQgPT09ICdzZXJ2ZScpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIC4uLmJhc2VDb25maWcsXHJcbiAgICAgIGRlZmluZToge1xyXG4gICAgICAgIF9fU0VSVkVSX1BPUlRfXzogcHJvY2Vzcy5lbnYuU0VSVkVSX1BPUlQsXHJcbiAgICAgIH0sXHJcbiAgICAgIHNlcnZlcjoge1xyXG4gICAgICAgIHBvcnQ6IE51bWJlcihwcm9jZXNzLmVudi5DTElFTlRfUE9SVCkgfHwgMzAwMCxcclxuICAgICAgfSxcclxuICAgIH07XHJcbiAgfSBlbHNlIHtcclxuICAgIGlmIChzc3JCdWlsZCkge1xyXG4gICAgICByZXR1cm4ge1xyXG4gICAgICAgIC4uLmJhc2VDb25maWcsXHJcbiAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgIGxpYjoge1xyXG4gICAgICAgICAgICBlbnRyeTogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL3Nzci50c3gnKSxcclxuICAgICAgICAgICAgbmFtZTogJ0NsaWVudCcsXHJcbiAgICAgICAgICAgIGZpbGVOYW1lOiAnY2xpZW50JyxcclxuICAgICAgICAgICAgZm9ybWF0czogWydjanMnXSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgICAgIGlucHV0OiB7XHJcbiAgICAgICAgICAgICAgbWFpbjogJy4vaW5kZXgtc3NyLmh0bWwnLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBvdXRwdXQ6IHtcclxuICAgICAgICAgICAgICBkaXI6ICcuL2Rpc3Qtc3NyJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgYnVpbGQ6IHtcclxuICAgICAgICAgIG1hbmlmZXN0OiB0cnVlLFxyXG4gICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICBpbnB1dDoge1xyXG4gICAgICAgICAgICAgIG1haW46ICcuL2luZGV4LXNzci5odG1sJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgICAgZGlyOiAnLi9kaXN0JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICAuLi5iYXNlQ29uZmlnLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFMsU0FBUyxvQkFBb0I7QUFDM1UsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUVuQixPQUFPLFVBQVU7QUFDakIsT0FBTyxVQUFVO0FBTGpCLElBQU0sbUNBQW1DO0FBR3pDLE9BQU8sT0FBTztBQUlkLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsU0FBUyxNQUFNLFNBQVMsTUFBTTtBQUMzRCxRQUFNLGFBQWE7QUFBQSxJQUNqQixLQUFLO0FBQUEsTUFDSCxxQkFBcUI7QUFBQSxRQUNuQixNQUFNO0FBQUEsVUFDSixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUFBLElBQ3pCLFNBQVM7QUFBQSxNQUNQLE9BQU87QUFBQSxRQUNMLEtBQUssS0FBSyxLQUFLLGtDQUFXLFdBQVc7QUFBQSxRQUNyQyxLQUFLLEtBQUssS0FBSyxrQ0FBVyxXQUFXO0FBQUEsUUFDckMsUUFBUSxLQUFLLEtBQUssa0NBQVcsY0FBYztBQUFBLFFBQzNDLFlBQVksS0FBSyxLQUFLLGtDQUFXLGtCQUFrQjtBQUFBLFFBQ25ELFdBQVcsS0FBSyxLQUFLLGtDQUFXLGlCQUFpQjtBQUFBLFFBQ2pELE1BQU0sS0FBSyxLQUFLLGtDQUFXLFlBQVk7QUFBQSxRQUN2QyxVQUFVLEtBQUssS0FBSyxrQ0FBVyxnQkFBZ0I7QUFBQSxRQUMvQyxNQUFNLEtBQUssS0FBSyxrQ0FBVyxZQUFZO0FBQUEsUUFDdkMsU0FBUyxLQUFLLEtBQUssa0NBQVcsZUFBZTtBQUFBLFFBQzdDLE9BQU8sS0FBSyxLQUFLLGtDQUFXLGFBQWE7QUFBQSxRQUN6QyxTQUFTLEtBQUssS0FBSyxrQ0FBVyxlQUFlO0FBQUEsUUFDN0MsUUFBUSxLQUFLLEtBQUssa0NBQVcsY0FBYztBQUFBLFFBQzNDLE9BQU8sS0FBSyxLQUFLLGtDQUFXLGFBQWE7QUFBQSxRQUN6QyxRQUFRLEtBQUssS0FBSyxrQ0FBVyxjQUFjO0FBQUEsUUFDM0MsY0FBYyxLQUFLLEtBQUssa0NBQVcsb0JBQW9CO0FBQUEsUUFDdkQsT0FBTyxLQUFLLEtBQUssa0NBQVcsYUFBYTtBQUFBLFFBQ3pDLE1BQU0sS0FBSyxLQUFLLGtDQUFXLFlBQVk7QUFBQSxNQUN6QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSSxZQUFZLFNBQVM7QUFDdkIsV0FBTztBQUFBLE1BQ0wsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLFFBQ04saUJBQWlCLFFBQVEsSUFBSTtBQUFBLE1BQy9CO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixNQUFNLE9BQU8sUUFBUSxJQUFJLFdBQVcsS0FBSztBQUFBLE1BQzNDO0FBQUEsSUFDRjtBQUFBLEVBQ0YsT0FBTztBQUNMLFFBQUksVUFBVTtBQUNaLGFBQU87QUFBQSxRQUNMLEdBQUc7QUFBQSxRQUNILE9BQU87QUFBQSxVQUNMLEtBQUs7QUFBQSxZQUNILE9BQU8sS0FBSyxRQUFRLGtDQUFXLGVBQWU7QUFBQSxZQUM5QyxNQUFNO0FBQUEsWUFDTixVQUFVO0FBQUEsWUFDVixTQUFTLENBQUMsS0FBSztBQUFBLFVBQ2pCO0FBQUEsVUFDQSxlQUFlO0FBQUEsWUFDYixPQUFPO0FBQUEsY0FDTCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0EsUUFBUTtBQUFBLGNBQ04sS0FBSztBQUFBLFlBQ1A7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLE9BQU87QUFDTCxhQUFPO0FBQUEsUUFDTCxPQUFPO0FBQUEsVUFDTCxVQUFVO0FBQUEsVUFDVixlQUFlO0FBQUEsWUFDYixPQUFPO0FBQUEsY0FDTCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0EsUUFBUTtBQUFBLGNBQ04sS0FBSztBQUFBLFlBQ1A7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsR0FBRztBQUFBLE1BQ0w7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
