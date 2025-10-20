import { Kernel } from "@onkernel/sdk";

export const kernel = new Kernel({
  apiKey: process.env.KERNEL_API_KEY,
  baseURL: "https://api.kernel.run", // official API endpoint
});
