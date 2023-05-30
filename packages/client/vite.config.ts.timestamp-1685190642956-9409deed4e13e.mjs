// ../client/vite.config.ts
import { defineConfig } from "file:///C:/github/wiz-monopoly/node_modules/vite/dist/node/index.js";
import react from "file:///C:/github/wiz-monopoly/node_modules/@vitejs/plugin-react/dist/index.mjs";
import dotenv from "file:///C:/github/wiz-monopoly/node_modules/dotenv/lib/main.js";
import path from "path";
var __vite_injected_original_dirname = "C:\\github\\wiz-monopoly\\packages\\client";
dotenv.config();
var vite_config_default = defineConfig(({ command, mode, ssrBuild }) => {
  const baseConfig = {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import 'styles/vars';`
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        api: path.join(__vite_injected_original_dirname, "./src/api"),
        app: path.join(__vite_injected_original_dirname, "./src/app"),
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcZ2l0aHViXFxcXHdpei1tb25vcG9seVxcXFxwYWNrYWdlc1xcXFxjbGllbnRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXGdpdGh1YlxcXFx3aXotbW9ub3BvbHlcXFxccGFja2FnZXNcXFxcY2xpZW50XFxcXHZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9naXRodWIvd2l6LW1vbm9wb2x5L3BhY2thZ2VzL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xyXG5pbXBvcnQgZG90ZW52IGZyb20gJ2RvdGVudic7XHJcbmRvdGVudi5jb25maWcoKTtcclxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgY29tbWFuZCwgbW9kZSwgc3NyQnVpbGQgfSkgPT4ge1xyXG4gIGNvbnN0IGJhc2VDb25maWcgPSB7XHJcbiAgICBjc3M6IHtcclxuICAgICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xyXG4gICAgICAgIHNjc3M6IHtcclxuICAgICAgICAgIGFkZGl0aW9uYWxEYXRhOiBgQGltcG9ydCAnc3R5bGVzL3ZhcnMnO2AsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSxcclxuICAgIH0sXHJcbiAgICBwbHVnaW5zOiBbcmVhY3QoKV0sXHJcbiAgICByZXNvbHZlOiB7XHJcbiAgICAgIGFsaWFzOiB7XHJcbiAgICAgICAgYXBpOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvYXBpJyksXHJcbiAgICAgICAgYXBwOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvYXBwJyksXHJcbiAgICAgICAgY29tcG9uZW50czogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL2NvbXBvbmVudHMnKSxcclxuICAgICAgICBjb25zdGFudHM6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9jb25zdGFudHMnKSxcclxuICAgICAgICBjb3JlOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvY29yZScpLFxyXG4gICAgICAgIGZlYXR1cmVzOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvZmVhdHVyZXMnKSxcclxuICAgICAgICBnYW1lOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvZ2FtZScpLFxyXG4gICAgICAgIGhlbHBlcnM6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9oZWxwZXJzJyksXHJcbiAgICAgICAgaG9va3M6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9ob29rcycpLFxyXG4gICAgICAgIGxheW91dHM6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9sYXlvdXRzJyksXHJcbiAgICAgICAgbW9kZWxzOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvbW9kZWxzJyksXHJcbiAgICAgICAgcGFnZXM6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuL3NyYy9wYWdlcycpLFxyXG4gICAgICAgIHN0eWxlczogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL3N0eWxlcycpLFxyXG4gICAgICAgIHRyYW5zbGF0aW9uczogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4vc3JjL3RyYW5zbGF0aW9ucycpLFxyXG4gICAgICAgIHR5cGVzOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvdHlwZXMnKSxcclxuICAgICAgICBkYXRhOiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi9zcmMvZGF0YScpLFxyXG4gICAgICB9LFxyXG4gICAgfSxcclxuICB9O1xyXG5cclxuICBpZiAoY29tbWFuZCA9PT0gJ3NlcnZlJykge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgLi4uYmFzZUNvbmZpZyxcclxuICAgICAgZGVmaW5lOiB7XHJcbiAgICAgICAgX19TRVJWRVJfUE9SVF9fOiBwcm9jZXNzLmVudi5TRVJWRVJfUE9SVCxcclxuICAgICAgfSxcclxuICAgICAgc2VydmVyOiB7XHJcbiAgICAgICAgcG9ydDogTnVtYmVyKHByb2Nlc3MuZW52LkNMSUVOVF9QT1JUKSB8fCAzMDAwLFxyXG4gICAgICB9LFxyXG4gICAgfTtcclxuICB9IGVsc2Uge1xyXG4gICAgaWYgKHNzckJ1aWxkKSB7XHJcbiAgICAgIHJldHVybiB7XHJcbiAgICAgICAgLi4uYmFzZUNvbmZpZyxcclxuICAgICAgICBidWlsZDoge1xyXG4gICAgICAgICAgbGliOiB7XHJcbiAgICAgICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvc3NyLnRzeCcpLFxyXG4gICAgICAgICAgICBuYW1lOiAnQ2xpZW50JyxcclxuICAgICAgICAgICAgZmlsZU5hbWU6ICdjbGllbnQnLFxyXG4gICAgICAgICAgICBmb3JtYXRzOiBbJ2NqcyddLFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHJvbGx1cE9wdGlvbnM6IHtcclxuICAgICAgICAgICAgaW5wdXQ6IHtcclxuICAgICAgICAgICAgICBtYWluOiAnLi9pbmRleC1zc3IuaHRtbCcsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG91dHB1dDoge1xyXG4gICAgICAgICAgICAgIGRpcjogJy4vZGlzdC1zc3InLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9LFxyXG4gICAgICB9O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHtcclxuICAgICAgICBidWlsZDoge1xyXG4gICAgICAgICAgcm9sbHVwT3B0aW9uczoge1xyXG4gICAgICAgICAgICBpbnB1dDoge1xyXG4gICAgICAgICAgICAgIG1haW46ICcuL2luZGV4LXNzci5odG1sJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb3V0cHV0OiB7XHJcbiAgICAgICAgICAgICAgZGlyOiAnLi9kaXN0JyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgICAuLi5iYXNlQ29uZmlnLFxyXG4gICAgICB9O1xyXG4gICAgfVxyXG4gIH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBOFMsU0FBUyxvQkFBb0I7QUFDM1UsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sWUFBWTtBQUVuQixPQUFPLFVBQVU7QUFKakIsSUFBTSxtQ0FBbUM7QUFHekMsT0FBTyxPQUFPO0FBR2QsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLE1BQU0sU0FBUyxNQUFNO0FBQzNELFFBQU0sYUFBYTtBQUFBLElBQ2pCLEtBQUs7QUFBQSxNQUNILHFCQUFxQjtBQUFBLFFBQ25CLE1BQU07QUFBQSxVQUNKLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxJQUNqQixTQUFTO0FBQUEsTUFDUCxPQUFPO0FBQUEsUUFDTCxLQUFLLEtBQUssS0FBSyxrQ0FBVyxXQUFXO0FBQUEsUUFDckMsS0FBSyxLQUFLLEtBQUssa0NBQVcsV0FBVztBQUFBLFFBQ3JDLFlBQVksS0FBSyxLQUFLLGtDQUFXLGtCQUFrQjtBQUFBLFFBQ25ELFdBQVcsS0FBSyxLQUFLLGtDQUFXLGlCQUFpQjtBQUFBLFFBQ2pELE1BQU0sS0FBSyxLQUFLLGtDQUFXLFlBQVk7QUFBQSxRQUN2QyxVQUFVLEtBQUssS0FBSyxrQ0FBVyxnQkFBZ0I7QUFBQSxRQUMvQyxNQUFNLEtBQUssS0FBSyxrQ0FBVyxZQUFZO0FBQUEsUUFDdkMsU0FBUyxLQUFLLEtBQUssa0NBQVcsZUFBZTtBQUFBLFFBQzdDLE9BQU8sS0FBSyxLQUFLLGtDQUFXLGFBQWE7QUFBQSxRQUN6QyxTQUFTLEtBQUssS0FBSyxrQ0FBVyxlQUFlO0FBQUEsUUFDN0MsUUFBUSxLQUFLLEtBQUssa0NBQVcsY0FBYztBQUFBLFFBQzNDLE9BQU8sS0FBSyxLQUFLLGtDQUFXLGFBQWE7QUFBQSxRQUN6QyxRQUFRLEtBQUssS0FBSyxrQ0FBVyxjQUFjO0FBQUEsUUFDM0MsY0FBYyxLQUFLLEtBQUssa0NBQVcsb0JBQW9CO0FBQUEsUUFDdkQsT0FBTyxLQUFLLEtBQUssa0NBQVcsYUFBYTtBQUFBLFFBQ3pDLE1BQU0sS0FBSyxLQUFLLGtDQUFXLFlBQVk7QUFBQSxNQUN6QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSSxZQUFZLFNBQVM7QUFDdkIsV0FBTztBQUFBLE1BQ0wsR0FBRztBQUFBLE1BQ0gsUUFBUTtBQUFBLFFBQ04saUJBQWlCLFFBQVEsSUFBSTtBQUFBLE1BQy9CO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDTixNQUFNLE9BQU8sUUFBUSxJQUFJLFdBQVcsS0FBSztBQUFBLE1BQzNDO0FBQUEsSUFDRjtBQUFBLEVBQ0YsT0FBTztBQUNMLFFBQUksVUFBVTtBQUNaLGFBQU87QUFBQSxRQUNMLEdBQUc7QUFBQSxRQUNILE9BQU87QUFBQSxVQUNMLEtBQUs7QUFBQSxZQUNILE9BQU8sS0FBSyxRQUFRLGtDQUFXLGVBQWU7QUFBQSxZQUM5QyxNQUFNO0FBQUEsWUFDTixVQUFVO0FBQUEsWUFDVixTQUFTLENBQUMsS0FBSztBQUFBLFVBQ2pCO0FBQUEsVUFDQSxlQUFlO0FBQUEsWUFDYixPQUFPO0FBQUEsY0FDTCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0EsUUFBUTtBQUFBLGNBQ04sS0FBSztBQUFBLFlBQ1A7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLE9BQU87QUFDTCxhQUFPO0FBQUEsUUFDTCxPQUFPO0FBQUEsVUFDTCxlQUFlO0FBQUEsWUFDYixPQUFPO0FBQUEsY0FDTCxNQUFNO0FBQUEsWUFDUjtBQUFBLFlBQ0EsUUFBUTtBQUFBLGNBQ04sS0FBSztBQUFBLFlBQ1A7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsR0FBRztBQUFBLE1BQ0w7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
