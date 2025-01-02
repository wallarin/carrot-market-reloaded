import {getIronSession} from "iron-session";
import {cookies} from "next/headers";

interface SessionContent {
    id?:number
}

export default function getSession() {
    return getIronSession<SessionContent>(cookies(), {
        cookieName: "delicious-karrot",
        password: process.env.COOKIE_PASSWORD!, // !: COOKIE_PASSWORD가 env파일에 무조건 존재한다는 의미
    });
}