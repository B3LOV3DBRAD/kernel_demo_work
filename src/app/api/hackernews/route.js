import { kernel } from "@/lib/kernel";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const topic = searchParams.get("topic") || "AI";

  try {
    // Try hitting the (mocked) Kernel endpoint
    const response = await fetch("https://postman-echo.com/get?topic=" + topic);
    const data = await response.json();

    return new Response(JSON.stringify({
      success: true,
      topic,
      message: `Kernel mock fetch successful for topic: ${topic}`,
      data
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });

  } catch (error) {
    console.error("Kernel error:", error);
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}


// New version using GPT-4o-mini

// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const topic = searchParams.get("topic") ?? "AI";

//   try {
//     const completion = await kernel.post("/v1/models/run", {
//       body: {
//         model: "gpt-4o-mini",
//         input: `Find recent Hacker News posts about ${topic} and output a JSON array of {title,url}.`,
//       },
//     });

//     return new Response(JSON.stringify(completion), {
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     return new Response(JSON.stringify({ error: err.message }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }

//Previous version using browse-hackernews action



// export async function GET(request) {
//   const { searchParams } = new URL(request.url);
//   const topic = searchParams.get("topic");
//   if (!topic) {
//     return new Response(
//       JSON.stringify({ error: "Missing topic parameter (?topic=...)" }),
//       { status: 400, headers: { "Content-Type": "application/json" } }
//     );
//   }

//   try {
//     const response = await kernel.post("/v1/actions/run", {
//       body: {
//         name: "browse-hackernews",
//         tools: ["browser"],
//         instructions: `
//           Go to https://news.ycombinator.com/.
//           Find posts related to "${topic}".
//           Return a JSON array of { title, url } (external blogs/articles only).
//         `,
//       },
//     });

//     const output = response?.output;
//     let data;
//     if (typeof output === "string") {
//       try { data = JSON.parse(output); } catch { data = []; }
//     } else {
//       data = output ?? [];
//     }

//     return new Response(JSON.stringify({ topic, results: data }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Kernel error:", err);
//     return new Response(
//       JSON.stringify({ error: err?.message ?? "Something went wrong" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }
