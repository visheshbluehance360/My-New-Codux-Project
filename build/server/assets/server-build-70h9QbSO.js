import { jsx, jsxs } from "react/jsx-runtime";
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer, Link, Outlet, Meta, Links, ScrollRestoration, Scripts, useRouteError, isRouteErrorResponse, useSearchParams } from "@remix-run/react";
import * as isbotModule from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { useState, useEffect } from "react";
import cx from "classnames";
import { ChevronLeft, ChevronRight } from "lucide-react";
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  let prohibitOutOfOrderStreaming = isBotRequest(request.headers.get("user-agent")) || remixContext.isSpaMode;
  return prohibitOutOfOrderStreaming ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function isBotRequest(userAgent) {
  if (!userAgent) {
    return false;
  }
  if ("isbot" in isbotModule && typeof isbotModule.isbot === "function") {
    return isbotModule.isbot(userAgent);
  }
  if ("default" in isbotModule && typeof isbotModule.default === "function") {
    return isbotModule.default(userAgent);
  }
  return false;
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsx(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new PassThrough();
          const stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const HOME = "/";
const ERROR = "/error";
const ROUTES = {
  home: { path: HOME, to: () => HOME },
  error: {
    path: ERROR,
    to: (title2, message) => `${ERROR}?title=${title2}&message=${message}`
  }
};
const root$3 = "_root_9ggj2_1";
const heading1 = "_heading1_9ggj2_9";
const link = "_link_9ggj2_13";
const styles$3 = {
  root: root$3,
  heading1,
  link
};
const unknownErrorTitle = "Ooops, something went wrong";
const ErrorComponent = ({ title: title2, message }) => {
  return /* @__PURE__ */ jsxs("div", { className: styles$3.root, children: [
    /* @__PURE__ */ jsx("h1", { className: styles$3.heading1, children: title2 ?? unknownErrorTitle }),
    message && /* @__PURE__ */ jsx("div", { children: message }),
    /* @__PURE__ */ jsx(Link, { to: ROUTES.home.to(), className: styles$3.link, children: "Navigate to Home Page" })
  ] });
};
function Layout({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsx("div", { id: "root", children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function ErrorBoundary() {
  const error = useRouteError();
  const { title: title2, message } = getErrorDetails(error);
  return /* @__PURE__ */ jsx(ErrorComponent, { title: title2, message });
}
function getErrorDetails(error) {
  var _a;
  let title2;
  let message;
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title2 = "Page Not Found";
      message = "Looks like the page you're trying to visit doesn't exist";
    } else {
      title2 = `${error.status} - ${error.statusText}`;
      message = ((_a = error.data) == null ? void 0 : _a.message) ?? "";
    }
  } else {
    title2 = "Unknown error occurred";
  }
  return { title: title2, message };
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ErrorBoundary,
  Layout,
  default: App
}, Symbol.toStringTag, { value: "Module" }));
const root$2 = "_root_1tyoc_1";
const title = "_title_1tyoc_12";
const paragraph = "_paragraph_1tyoc_16";
const content = "_content_1tyoc_24";
const styles$2 = {
  root: root$2,
  title,
  paragraph,
  content
};
function getUrlOriginWithPath(url) {
  const { origin, pathname } = new URL(url);
  return new URL(pathname, origin).toString();
}
const root$1 = "_root_19zd0_1";
const even = "_even_19zd0_12";
const QuoteText = "_QuoteText_19zd0_16";
const QuoteAuthor = "_QuoteAuthor_19zd0_21";
const styles$1 = {
  root: root$1,
  even,
  QuoteText,
  QuoteAuthor
};
const QuoteItem = ({ className, quote }) => {
  return /* @__PURE__ */ jsxs("div", { className: cx(styles$1.root, className, styles$1.Quote, ((quote == null ? void 0 : quote.id) || 0) % 2 == 0 ? styles$1.even : ""), children: [
    /* @__PURE__ */ jsx("div", { className: styles$1.QuoteText, children: (quote == null ? void 0 : quote.quote) && quote.quote }),
    /* @__PURE__ */ jsx("div", { className: styles$1.QuoteAuthor, children: (quote == null ? void 0 : quote.author) && quote.author })
  ] });
};
const header1 = "_header1_m4cqp_1";
const styles0 = {
  header1
};
const root = "_root_kacy3_1";
const pageNumberInput = "_pageNumberInput_kacy3_12";
const styles = {
  root,
  pageNumberInput
};
const PaginationBar = ({
  className,
  pageCount = 1,
  currentPage = 1,
  setCurrentPage
}) => {
  function goToPrev() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }
  function goToNext() {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  }
  return /* @__PURE__ */ jsxs("div", { className: cx(styles.root, className), children: [
    /* @__PURE__ */ jsx("div", { className: "left", children: /* @__PURE__ */ jsx("button", { onClick: goToPrev, disabled: !(currentPage > 1), children: /* @__PURE__ */ jsx(ChevronLeft, { className: cx("prevButton h-4 w-4") }) }) }),
    /* @__PURE__ */ jsx("div", { className: "center", children: /* @__PURE__ */ jsxs("div", { className: "currentAndTotalPages", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          className: cx(styles.pageNumberInput),
          type: "number",
          max: pageCount,
          value: currentPage,
          onChange: (e) => setCurrentPage(Number(e.target.value))
        }
      ),
      " ",
      "/ ",
      pageCount
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "right", children: /* @__PURE__ */ jsx("button", { onClick: goToNext, disabled: !(currentPage < pageCount), children: /* @__PURE__ */ jsx(
      ChevronRight,
      {
        className: cx("nextButton h-4 w-4")
      }
    ) }) })
  ] });
};
const loader = ({ request }) => {
  return { canonicalUrl: getUrlOriginWithPath(request.url) };
};
function HomePage() {
  const [quotes, setQuotes] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const PageSize = 3;
  useEffect(() => {
    fetch(`https://dummyjson.com/quotes?limit=${PageSize}&skip=${currentPage * PageSize - PageSize}`).then((res) => res.json()).then((json) => {
      console.log(json);
      setQuotes(json.quotes);
      const numberOfPages = Math.ceil(json.total / json.limit);
      setPageCount(numberOfPages);
    });
  }, [setQuotes, currentPage]);
  return /* @__PURE__ */ jsxs("div", { className: styles$2.root, children: [
    /* @__PURE__ */ jsxs("header", { className: styles0.header1, children: [
      /* @__PURE__ */ jsx("h2", { className: styles$2.title, children: "Welcome to Homepage 🎉" }),
      /* @__PURE__ */ jsx("span", { children: "The project will be using JSONPlaceholder API" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: styles$2.content, children: [
      quotes.map((quote, index) => /* @__PURE__ */ jsx(QuoteItem, { quote }, index)),
      /* @__PURE__ */ jsx(PaginationBar, { pageCount, currentPage, setCurrentPage })
    ] })
  ] });
}
const meta = ({ data }) => {
  const title2 = "Blank Starter";
  const description = "Welcome to the Blank Starter";
  const imageUrl = "https://website-starter.com/og-image.png";
  return [
    { title: title2 },
    {
      name: "description",
      content: description
    },
    {
      tagName: "link",
      rel: "canonical",
      href: data == null ? void 0 : data.canonicalUrl
    },
    {
      property: "robots",
      content: "index, follow"
    },
    {
      property: "og:title",
      content: title2
    },
    {
      property: "og:description",
      content: description
    },
    {
      property: "og:image",
      content: imageUrl
    },
    {
      name: "twitter:card",
      content: "summary_large_image"
    },
    {
      name: "twitter:title",
      content: title2
    },
    {
      name: "twitter:description",
      content: description
    },
    {
      name: "twitter:image",
      content: imageUrl
    }
  ];
};
const links = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.ico",
      type: "image/ico"
    }
  ];
};
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: HomePage,
  links,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
function ErrorPage() {
  const [searchParams] = useSearchParams();
  const title2 = searchParams.get("title");
  const message = searchParams.get("message");
  return /* @__PURE__ */ jsx(ErrorComponent, { title: title2, message });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ErrorPage
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-DGeukN32.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-B1ga6eyM.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": true, "module": "/assets/root-DLM3U5tF.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/components-B1ga6eyM.js", "/assets/error-component-CXTy4cJr.js"], "css": ["/assets/root-iw3kjUnO.css", "/assets/error-component-eSR-7-wk.css"] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-B9F6SdnB.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js"], "css": ["/assets/route-DZ1SnysR.css"] }, "routes/error": { "id": "routes/error", "parentId": "root", "path": "error", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/route-CMUx-qKg.js", "imports": ["/assets/jsx-runtime-56DGgGmo.js", "/assets/error-component-CXTy4cJr.js", "/assets/components-B1ga6eyM.js"], "css": ["/assets/error-component-eSR-7-wk.css"] } }, "url": "/assets/manifest-156d8450.js", "version": "156d8450" };
const mode = "production";
const assetsBuildDirectory = "build\\client";
const basename = "/";
const future = { "v3_fetcherPersist": false, "v3_relativeSplatPath": false, "v3_throwAbortReason": false, "v3_singleFetch": false, "v3_lazyRouteDiscovery": false, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route1
  },
  "routes/error": {
    id: "routes/error",
    parentId: "root",
    path: "error",
    index: void 0,
    caseSensitive: void 0,
    module: route2
  }
};
const build = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  assets: serverManifest,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
}, Symbol.toStringTag, { value: "Module" }));
export {
  assetsBuildDirectory as a,
  build as b,
  basename as c,
  entry as e,
  future as f,
  isSpaMode as i,
  mode as m,
  publicPath as p,
  routes as r,
  serverManifest as s
};
