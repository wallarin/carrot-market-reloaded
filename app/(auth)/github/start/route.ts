
export function GET() {
    const baseURL = "https://github.com/login/oauth/authorize"
    const params = {
        client_id: process.env.GITHUB_CLIENT_ID!, // .env 파일에 저장해놓은 ID Key
        scope: "read:user,user:email", // 사용자의 GitHub Email 불러오기
        allow_signup: "true", // GitHub 가입 후 사용가능 여부
    };

    const formattedParams = new URLSearchParams(params).toString();
    const finalURL = `${baseURL}?${formattedParams}`;
    return Response.redirect(finalURL);
}