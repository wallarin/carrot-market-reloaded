"use server";

import {z} from "zod";
import {PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR} from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import getSession, {saveSession} from "@/lib/session";
import {redirect} from "next/navigation";

const checkEmailExists = async (email: string) => {
    const user = await db.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
        }
    });
    return Boolean(user);
}

const loginSchema = z.object({
    email: z.string().email().toLowerCase()
        .refine(checkEmailExists, "이메일이 존재하지 않습니다."),
    password: z.string({
        required_error: "패스워드를 입력해주세요."
    }).min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
})
export async function login(prevState: any, formData: FormData) {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
    };

    const result = await loginSchema.spa(data); // safeParseAsync() === spa()
    if (!result.success) {
        return result.error.flatten();
    } else {
        // 사용자가 로그인할 이메일 정보 찾기 => 유효성 검사의 일종이기 때문에 zod로 일임한다.
        // 사용자를 찾으면 비밀번호의 해시값을 찾는다
        const user = await db.user.findUnique({
            where: {
                email: result.data.email
            },
            select: {
                id: true,
                password: true
            }
        });
        const ok = await bcrypt.compare(result.data.password, user!.password ?? "") // 사용자가 입력한 해쉬값과 데이터베이스의 해쉬값을 비교한다.
        // user!: 값이 반드시 존재한다는걸 TypeScript에 알려준다.
        // ?? "": null인 경우에 빈 값과 비교한다. => 추후 수정 예정

        if (ok) {
            await saveSession(user!.id);
            redirect("/profile");
        } else {
            return { // 에러를 zod와 동일하게 해서 보내준다. (zod인 척하는 것이다.)
                fieldErrors: {
                    password: ["잘못된 비밀번호입니다."],
                    email: []
                }
            }
        }

        // 해시값이 일치하면 로그인 처리한다.
        // profile 페이지로 redirect 시킨다.
    }
}