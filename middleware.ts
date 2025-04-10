import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // Simply log basic information and continue
  console.log(`Page visit: ${request.nextUrl.pathname}`)

  // Continue with the request
  return NextResponse.next()
}

// Only run middleware on specific paths
export const config = {
  matcher: ["/", "/dashboard", "/presale", "/affiliate", "/calculator", "/airdrop", "/articles"],
}
