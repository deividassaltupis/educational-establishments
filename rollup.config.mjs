import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";
import livereload from "rollup-plugin-livereload";
import terser from "@rollup/plugin-terser";
import copy from "rollup-plugin-copy";

const isProduction = process.env.NODE_ENV === "production";

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: !isProduction,
  },
  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    babel({
      babelHelpers: "bundled",
      presets: ["@babel/preset-react"],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      compact: false,
    }),
    commonjs(),
    replace({
      preventAssignment: false,
      "process.env.NODE_ENV": JSON.stringify(
        process.env.NODE_ENV || "development",
      ),
      delimiters: ["", ""],
      "use client": "",
    }),
    !isProduction &&
      serve({
        open: true,
        contentBase: "dist",
        port: 3000,
        historyApiFallback: true,
      }),
    !isProduction &&
      livereload({
        watch: "dist",
      }),
    isProduction && terser(), // Minify code for production
    copy({
      targets: [
        { src: "public/", dest: "dist" },
        { src: "public/index.html", dest: "dist" },
      ],
    }),
  ].filter(Boolean),
};
