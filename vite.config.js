import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default () => {
  return defineConfig({
    root: "./src",
    base: "",
    plugins: [
      react(),
      {
        name: "override-config",
        config: () => ({
          build: {
            target: "es2019",
          },
        }),
      },
    ],
    build: {
      target: "es2019", // Có thể thử với es2017 hoặc es2020
      esbuild: {
        // Cấu hình cho esbuild
        legalComments: "inline",
      },
    },
  });
};
