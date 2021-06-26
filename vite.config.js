import path from "path";
import { defineConfig } from "vite";
import dotenv from "rollup-plugin-dotenv";

export default defineConfig({
  plugins: [dotenv()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/ThreeMapManager"),
      name: "ThreeMapManager",
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
