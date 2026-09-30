import { auth } from "@/lib/auth";

// Export the explicit proxy function wrapping your initialized auth handler
export async function proxy(request) {
  return auth(request);
}

// Keep your path interceptors configuration exactly as it is
export const config = {
  matcher: ["/admin/:path*"],
};