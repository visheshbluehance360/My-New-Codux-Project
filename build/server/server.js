import { createRequestHandler } from "@netlify/remix-adapter";
import { b as build } from "./assets/server-build-70h9QbSO.js";
import "react/jsx-runtime";
import "node:stream";
import "@remix-run/node";
import "@remix-run/react";
import "isbot";
import "react-dom/server";
import "react";
import "classnames";
import "lucide-react";
const _virtual_netlifyServer = createRequestHandler({
  build,
  getLoadContext: async (_req, ctx) => ctx
});
export {
  _virtual_netlifyServer as default
};
