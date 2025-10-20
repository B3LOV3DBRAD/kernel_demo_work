# kernel_demo_work

This is a small experiment I made while trying to build an API connection using the Kernel SDK.  
The goal was to have an endpoint that returns links from Hacker News based on a given parameter (like “AI,” “data,” or “startups”).  

The `.run()` method from the Kernel SDK didn’t seem to be working yet, so this version includes a placeholder route that mimics what the final API would do once live.  
It’s mostly about getting familiar with Kernel’s structure,  and figuring out how data flow and actions work locally.

---

## What I Did

- Setting up a Next.js API route that calls Kernel’s SDK.  
- Testing whether `Kernel.run()` could execute a remote action.  
- Adding a mock fallback when the endpoint didn’t seem to be active.  
- Learning how the SDK interacts with local `.env` API keys and environment variables.  
- Planning to eventually make it return real Hacker News links based on search terms.
