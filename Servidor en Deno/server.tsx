// @deno-types="https://deno.land/x/servest@v1.3.1/types/react/index.d.ts"
import React from "https://dev.jspm.io/react/index.js";
// @deno-types="https://deno.land/x/servest@v1.3.1/types/react-dom/server/index.d.ts"
import ReactDOMServer from "https://dev.jspm.io/react-dom/server.js";
import {
  contentTypeFilter,
  createApp,
} from "https://deno.land/x/servest@v1.3.1/mod.ts";

const app = createApp();
let colors: Array<any> = [];

const listColors = colors.map((color) => (<li>color</li>));

const htmlPage = (
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>Servest</title>
    </head>
    <body>
      <h1>Pick the color</h1>
      <form action="/color" method="post">
        <input type="color" name="color"></input>
        <input type="submit"></input>
      </form>
      <ul>{colors}</ul>
    </body>
  </html>
);

app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(htmlPage),
  });
});

app.post(
  "/color",
  contentTypeFilter("application/x-www-form-urlencoded"),
  async (req) => {
    const bodyForm = await req.formData();
    const color = bodyForm.value("color");
    colors.push(color);
    await req.respond({
      status: 200,
      headers: new Headers({
        "content-type": "text/html; charset=UTF-8",
      }),
      body: ReactDOMServer.renderToString(htmlPage),
    });
  }
);

app.listen({ port: 8080 });
