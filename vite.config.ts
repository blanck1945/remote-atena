import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import federation from "@originjs/vite-plugin-federation";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "remote-seed",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/AtenaApp.tsx",
      },
      shared: ["react", "react-dom", "react-router"],
    }),
  ],
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
  },
});

// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// // import federation from "@originjs/vite-plugin-federation";
// import { federation } from "@module-federation/vite";
// import tailwindcss from "@tailwindcss/vite";
// import { dependencies } from "./package.json";

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//     tailwindcss(),
//     federation({
//       name: "host-dec",
//       remotes: {
//         // remoteApp: {
//         //   type: "module",
//         //   name: "remoteApp",
//         //   entry: "https://remote-atena.vercel.app/assets/remoteEntry.js",
//         // },
//         "remote-seed": {
//           type: "module",
//           name: "remote-seed",
//           entry: "http://localhost:5001/assets/remoteEntry.js",
//         },
//         // remoteReactStreamlit:
//         //   "https://boogie-blizzard.vercel.app/assets/remoteEntry.js",
//       },
//       exposes: {},
//       filename: "remoteEntry.js",
//       shared: {
//         react: {
//           requiredVersion: dependencies.react,
//           singleton: true,
//         },
//         "react-dom": {
//           requiredVersion: dependencies["react-dom"],
//           singleton: true,
//         },
//         "react-router": {
//           requiredVersion: dependencies["react-router"],
//           singleton: true,
//         },
//         "react-router-dom": {
//           requiredVersion: dependencies["react-router-dom"],
//           singleton: true,
//         },
//       },
//     }),
//   ],
//   build: {
//     target: "esnext",
//     minify: false,
//     cssCodeSplit: false,
//     modulePreload: false,
//   },
// });
