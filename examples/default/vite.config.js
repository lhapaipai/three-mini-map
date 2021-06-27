import { defineConfig } from "vite";
import dotenv from "rollup-plugin-dotenv";

export default defineConfig({
  plugins: [
    dotenv({
      cwd: "../..",
    }),
  ],
  publicDir: "../../public",
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
