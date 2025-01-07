export async function accessToken(code: string) { // 토큰 가져오기 함수
    let accessTokenURL = "https://github.com/login/oauth/access_token";
    const accessTokenParams = new URLSearchParams({
        client_id: process.env.GITHUB_CLIENT_ID!,
        client_secret: process.env.GITHUB_CLIENT_SECRET!,
        code, // === code: code
    });

    accessTokenURL = `${accessTokenURL}?${accessTokenParams}`;

    const accessTokenResponse = await fetch(accessTokenURL, {
        method: "POST",
        headers: {
            Accept: "application/json",
        }
    });

    return accessTokenResponse.json();
}