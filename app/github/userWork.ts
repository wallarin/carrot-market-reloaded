import db from "@/lib/db";
import {saveSession} from "@/lib/session";
import {redirect} from "next/navigation";

export async function findUser(id: number) {
    const user = await db.user.findUnique({
        where: {
            github_id: id.toString(),
        },
        select: {
            id: true,
        }
    });
    if (user) { // 처리된 Github 값을 가지고 github_id를 조회한다.
        // user가 존재한다면 로그인이기 때문에 세션을 가져와 처리해준다.
        await saveSession(user.id);
        return redirect("/profile");
    }
}

// 중복된 username 체크
export async function dupleUsername(login: string) {
    const user = await db.user.findFirst({ // 나는 username 컬럼에 Unique를 처리하지 않았기 때문에 findFirst(찾은 첫번째 값 반환)로 처리
        where: {
            username: login,
        },
        select: {
            id: true,
        }
    });
    return !!user;
}

export async function saveUser(login: string, id: number, avatar_url: string, email: string) {
    const newUser = await db.user.create({
        data: {
            username: login,
            github_id: id.toString(),
            avatar: avatar_url,
            email
        },
        select: {
            id: true,
        }
    })
    await saveSession(newUser.id);
    return redirect("/profile");
}