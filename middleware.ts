import {NextRequest, NextResponse} from "next/server";
import getSession from "@/lib/session";

export async function middleware(request: NextRequest) {
    // const session = await getSession(); middleware에서 session 정보 또한 가져올 수 있다.
    const passname = request.nextUrl.pathname;
    if (passname === "/") {
        const response = NextResponse.next();
        response.cookies.set("middleware-cookie", "hello!")
        return response;
    }
    if (passname === "/profile") {
        // 현재 URL이 /profile에 로그인 하지 않고 들어온 상태라면 Home으로 돌려보낸다.
        return NextResponse.redirect(new URL("/", request.url));
    }
};

export const config = {
    matcher: ["/", "/profile", "/create-account"] // 특정 경로에서만 middleware가 동작하도록 설정 할 수 있다. // "/user/:path*: 다중 경로를 설정할 수 있다. ex) /user/profile, /user/reviews 등등에서 동작
};