const express = require("express");
const vite = require("vite");
const PORT = 8080;

async function createServer(root = process.cwd()) {
  const app = express();
  const server = await vite.createServer({
    root,
    logLevel: "info",
    server: {
      // middlewareMode: 'ssr',
      middlewareMode: true,
      // hmr: {
      //   server: app,
      // },
    },
    appType: "custom",
  });

  app.use(server.middlewares);

  app.get("/favicon.ico", (_, res) => {
    res.status(204).end();
  });

  app.use("*", async (req, res) => {
    console.log(`Request to ${req.originalUrl}`);

    try {
      const { render } = await server.ssrLoadModule("/src/entry-server.tsx");
      // const context = render(res, req.originalUrl);

      // if (context.url) {
      //   console.log(
      //     `App router redirected to '${context.url}' during server rendering`
      //   );
      //   res.status(302).redirect(context.url);
      // }
      // 6. Send the rendered HTML back.
      res.status(200).set({ "Content-Type": "text/html" }).end(render());
    } catch (e) {
      server && server.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, server };
}

createServer().then(({ app }) =>
  app.listen(PORT, () => {
    console.log(
      `Server started on port ${PORT}. open: http://localhost:${PORT}`
    );
  })
);
