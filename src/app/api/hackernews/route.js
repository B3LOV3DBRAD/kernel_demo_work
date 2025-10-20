import { kernel } from "@/lib/kernel";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic");

  if (!topic) {
    return new Response(
      JSON.stringify({ error: "Missing topic parameter (?topic=...)" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    // Ask Kernel AI to find relevant blog post links
    const response = await kernel.post("/v1/models/run", {
      body: {
        model: "gpt-4o-mini",
        input: `
          You are an AI web researcher.
          Find 5 recent blog posts or articles related to "${topic}".
          Return the output as a JSON array where each object has:
          { "title": string, "url": string }.
          Only include legitimate external links, not summaries or opinions.
        `,
      },
    });

    const textOutput = response?.output_text ?? "";
    let data;

    try {
      data = JSON.parse(textOutput);
    } catch {
      // fallback if the model didn’t format perfectly
      const match = textOutput.match(/\[.*\]/s);
      data = match ? JSON.parse(match[0]) : [{ message: textOutput.trim() }];
    }

    return new Response(JSON.stringify({ topic, results: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Kernel API error:", error);
    return new Response(
      JSON.stringify({
        error: error.message || "Something went wrong with Kernel request.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
