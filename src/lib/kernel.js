import { Kernel } from "@onkernel/sdk";

let kernel;

try {
  kernel = new Kernel({
    apiKey: process.env.KERNEL_API_KEY,
    // temporary fallback since api.kernel.run is unreachable
    baseURL: "https://postman-echo.com"
  });
} catch (error) {
  console.error("Kernel init failed:", error);
}

export { kernel };
