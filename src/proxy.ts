import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ratelimit } from "./lib/ratelimit";

// This function can be marked `async` if using `await` inside
export default async function proxy(request: NextRequest) {
    const forwarded = request.headers.get("x-forwarded-for");
    const realIp = request.headers.get("x-real-ip");

    const ip = forwarded?.split(",")[0]?.trim() || realIp || "127.0.0.1";

    const { success, limit, remaining, reset } = await ratelimit.limit(ip);

    if (!success) {
        return NextResponse.json(
            {
                message: "Too many requests!",
            },
            {
                status: 429,
                headers: {
                    "X-Ratelimit-Limit": limit.toString(),
                    "X-Ratelimit-Remaining": remaining.toString(),
                    "X-Ratelimit-Reset": reset.toString(),
                },
            },
        );
    }

    return NextResponse.next()
}

export const config = {
    matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
