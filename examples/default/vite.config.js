import { defineConfig } from "vite";
import dotenv from "rollup-plugin-dotenv";

export default defineConfig({
  plugins: [
    dotenv({
      cwd: "../..",
    }),
  ],
  publicDir: "../../public",
  base: "/default/",
  build: {
    chunkSizeWarningLimit: 1000,
  },
});
