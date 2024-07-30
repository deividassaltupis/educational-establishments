import nodeResolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import babel from "@rollup/plugin-babel"
import replace from "@rollup/plugin-replace"
import typescript from "@rollup/plugin-typescript"
import serve from "rollup-plugin-serve"
import livereload from "rollup-plugin-livereload"
import terser from "@rollup/plugin-terser"
import copy from "rollup-plugin-copy"
import json from "@rollup/plugin-json"
import dotenv from "dotenv"

dotenv.config()
const env = process.env.NODE_ENV || "development"
const isProduction = env === "production"

const envVariables = {}
for (const key in process.env) {
  if (process.env.hasOwnProperty(key)) {
    envVariables[`process.env.${key}`] = JSON.stringify(process.env[key])
  }
}

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/bundle.js",
    format: "iife",
    sourcemap: !isProduction
  },
  plugins: [
    json(),
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    }),
    typescript({
      tsconfig: "./tsconfig.json"
    }),
    babel({
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-env",
        "@babel/preset-react",
        "@babel/preset-typescript"
      ],
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      compact: false,
      exclude: "node_modules/**"
    }),
    commonjs(),
    replace({
      preventAssignment: false,
      ...envVariables,
      delimiters: ["", ""],
      "use client": ""
    }),
    !isProduction &&
      serve({
        open: true,
        contentBase: "dist",
        port: 3000,
        historyApiFallback: true
      }),
    !isProduction &&
      livereload({
        watch: "dist"
      }),
    isProduction && terser(), // Minify code for production
    copy({
      targets: [
        { src: "public/", dest: "dist" },
        { src: "public/index.html", dest: "dist" }
      ]
    })
  ].filter(Boolean)
}
