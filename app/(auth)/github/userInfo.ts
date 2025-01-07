// 이메일 리턴 값 정의
interface emailResponse {
    email: string,
    primary: boolean,
    verified: boolean,
    visibility: string,
}

export async function userEmail(access_token: string) {
    // 이메일 가져오기
    const userEmailResponse = await fetch("https://api.github.com/user/emails", {
        headers: {
            "Authorization": `Bearer ${access_token}`
        },
        cache: "no-cache",
    });

    const emailData = await userEmailResponse.json();
    // const email = emailData
    //     .filter((item: emailResponse) => item.visibility !== null)
    //     .map((item: emailResponse) => item.email)[0];
    return emailData.find((item: emailResponse) => item.visibility !== null)?.email;
}

export async function userProfile(access_token: string) {
    const userProfileResponse = await fetch("https://api.github.com/user", {
        headers: {
            "Authorization": `Bearer ${access_token}`
        },
        cache: "no-cache",
    });

    return userProfileResponse.json();
}