import {NextRequest} from "next/server";
import {userEmail, userProfile} from "@/app/github/userInfo";
import {accessToken} from "@/app/github/token";
import {dupleUsername, findUser, saveUser} from "@/app/github/userWork";

export async function GET(request:NextRequest) {
    const code = request.nextUrl.searchParams.get('code');
    if (!code) {
        return new Response(null, {
            status: 400,
        });
        // return notFound();
    }

    // GitHub 토큰 가져오기, 실패 시 에러발생
    const {error, access_token} = await accessToken(code);
    if (error) {
        return new Response(null, {
            status: 400,
        });
    }

    // 토큰 정보를 가지고 이메일 정보 가져오기
    const email: string = await userEmail(access_token);
    // 토큰 정보를 가지고 유저 정보 가져오기
    const {id, avatar_url, login} = await userProfile(access_token);
    await findUser(id);
    const isDuple = await dupleUsername(login);
    if (!isDuple) {
        await saveUser(login, id, avatar_url, email);
    } else {
        // 중복된 닉네임 발생 시 username_github로 처리
        await saveUser(login + "_github", id, avatar_url, email);
    }

    // 코드 만료 에러 메시지
    // "error": "bad_verification_code",
    // "error_description": "The code passed is incorrect or expired.", // 코드가 만료됨
    // "error_uri": "https://docs.github.com/apps/managing-oauth-apps/troubleshooting-oauth-app-access-token-request-errors/#bad-verification-code"
}

/*
* 코드 챌린지
* 1. id값을 받아 getSession에 id를 저장시키는 함수 만들어 오기 => lib/session.ts에 처리
* 2. username의 중복을 피하여 저장하는 방법
* 3. user의 이메일 정보를 가져오기
* */