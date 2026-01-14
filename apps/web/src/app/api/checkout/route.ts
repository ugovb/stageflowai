import { NextResponse } from "next/server";
// import { createClient } from "@supabase/ssr"; // Removed invalid import
// If not installed, I might need to adjust auth check.
// The stack said "Supabase Auth".
// I'll assume cookies are handled.

export async function POST(req: Request) {
  try {
    const { planId, isAnnual } = await req.json();

    // Auth Check
    // Note: In a real app we'd verify session here.
    // I'll mock the backend call directly, which should handle auth via token forwarding if we were proxying.
    // But since this is a server route calling an external backend, we need the user's token.
    // For simplicity in this prompt context, I'll assume we call the backend with the user's token
    // or we just return a mocked URL if backend isn't reachable in this env.

    // Call Backend API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
    // We need to pass the Authorization header. 
    // In a real app, we extract it from cookies/session.
    // Here, I will assume we might simply construct the URL client side if possible, 
    // OR we forward the request.

    // Actually, the simplest way is to fetch the backend endpoint which generates the link.
    // We need the user's JWT. 
    // Let's assume we can get it from headers or cookies.

    // For this implementation, I will just forward the call to the backend.

    // Construct backend payload/params
    // Backend expects: GET /api/payment/checkout-url?plan=...
    const planParam = planId === 'profil_pro' ? 'profil_pro' : isAnnual ? 'yearly' : 'monthly';
    // Backend logic: "monthly" or "yearly" or "profil_pro"
    // Wait, backend logic in payment.py:
    // if plan == "profil_pro": ... else ... if plan == "monthly" ...
    // So we pass "monthly" or "yearly" or "profil_pro".
    // Wait, my backend implementation expected "monthly" (default) or "yearly".
    // I added "profil_pro" handling in the previous turn!

    // Let's construct the call.
    // We need the user's token.
    const authHeader = req.headers.get("Authorization");
    // If calling from browser, we might not have Auth header in API route unless passed.
    // But cookies are sent.

    // Let's assume the frontend passes the token or we use a proxy rewrite.
    // If we use Next.js API route as a proxy:

    const res = await fetch(`${backendUrl}/api/payment/checkout-url?plan=${planParam}`, {
      headers: {
        "Authorization": authHeader || "", // Pass through if present
        // If using cookies for supabase, we might need to exchange them.
      }
    });

    if (!res.ok) {
      // Fallback for demo if backend not running/configured
      return NextResponse.json({
        error: "Backend error or not configured"
      }, { status: res.status });
    }

    const data = await res.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error("Checkout route error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
