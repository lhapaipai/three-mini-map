import path from "path";
import { defineConfig } from "vite";
import dotenv from "rollup-plugin-dotenv";

export default defineConfig({
  plugins: [dotenv()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/MiniMapManager"),
      name: "MiniMapManager",
    },
    rollupOptions: {
      external: ["three"],
      output: {
        globals: {
          three: "THREE",
        },
      },
    },
  },
});
