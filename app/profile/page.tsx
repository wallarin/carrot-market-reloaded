import getSession from "@/lib/session";
import db from "@/lib/db";
import {notFound, redirect} from "next/navigation";

async function getUser() {
    const session = await getSession();
    if (session.id) {
        const user = await db.user.findUnique({
            where: {
                id: session.id,
            }
        });
        if (user) {
            return user;
        }
    }
    notFound();
}

export default async function Profile() {
    const user = await getUser();
    const logOut = async () => {
        "use server";
        const session = await getSession();
        session.destroy(); // 세션을 파괴한다.
        redirect("/");
    }
    return (
        <div>
            <h1>어서오세요! {user?.username} 님.</h1>
            <form action={logOut}>
                <button>로그아웃</button>
            </form>
        </div>
    )
}