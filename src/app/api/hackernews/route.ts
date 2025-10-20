import { kernel } from "@/lib/kernel";
import { Stagehand } from "@browserbasehq/stagehand";
import { z } from "zod";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");

  if (!topic) {
    return new Response(
      JSON.stringify({ error: "Missing topic parameter (?topic=...)" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const browser = await kernel.browsers.create();

    const stagehand = new Stagehand({
      env: 'LOCAL',
      verbose: 1,
      domSettleTimeoutMs: 30_000,
      modelName: 'gpt-4o',
      modelClientOptions: {
        apiKey: process.env.OPENAI_API_KEY
      },
      localBrowserLaunchOptions: {
        cdpUrl: browser.cdp_ws_url
      }
    });

    await stagehand.init();

    const page = stagehand.page;

    await page.goto("https://news.ycombinator.com/news");

    const output = await page.extract({
      instruction: `Extract 5 recent blog posts or articles related to ${topic}`,
      schema: z.object({
        links: z.array(z.object({
          title: z.string(),
          url: z.string()
        }))
      })
    });

    return new Response(JSON.stringify({ topic, results: output }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Kernel API error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Something went wrong with Kernel request.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
