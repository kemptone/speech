import { Application, send, Router } from "https://deno.land/x/oak/mod.ts"

const app = new Application()

const apiRouter = new Router({ prefix: "/api" })
apiRouter
  .get("/", (context) => {
    context.response.body = { some: "object" }
  })

app.use(apiRouter.routes())

app.use(async (context) => {
  await send(context, context.request.url.pathname, {
    root: `${Deno.cwd()}/static`,
    index: "index.html",
  })
})

await app.listen({ port: 8000 })