import {NextRequest, NextResponse} from "next/server";
import getSession from "@/lib/session";


export async function middleware(request: NextRequest) {
    /*
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
    */

    interface Routes {
        [key: string]: boolean;
    }

    const publicOnlyUrls: Routes = { // 사용자에게 개방된 페이지
        // ※ Object에서 아이템을 찾는게 Array에서 찾는것보다 빠르다!
        "/": true,
        "/login": true,
        "/sms": true,
        "/create-account": true,
        "/github/start": true,
        "/github/complete": true,
    }
    
    // 인증된 사용자만 접근이 가능하도록 처리해보기
    // 1. 세션을 가져와 사용자가 쿠키에 ID 정보값을 가지고 있는지 체크
    const session = await getSession();
    const exists = publicOnlyUrls[request.nextUrl.pathname]
    if (!session.id) { // session.id가 없다면 로그인하지 않은 상태일 것
        if(!exists) {
            return NextResponse.redirect(new URL("/", request.url));
        }
    } else {
        if(exists) {
            return NextResponse.redirect(new URL("/products", request.url));
        }
    }

}

export const config = {
    matcher: ["/", "/profile", "/create-account"] // 특정 경로에서만 middleware가 동작하도록 설정 할 수 있다. // "/user/:path*: 다중 경로를 설정할 수 있다. ex) /user/profile, /user/reviews 등등에서 동작
};