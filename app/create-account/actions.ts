"use server"
import { z } from "zod";
import {PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR} from "@/lib/constants";
import db from "@/lib/db";
import bcrypt from "bcrypt";
import {redirect} from "next/navigation";
import getSession from "@/lib/session";

const checkPassword = ({password, confirm_password}:
                           {password:string, confirm_password:string}) => password === confirm_password

const checkUniqueEmail = async (email: string) => {
    const user = await db.user.findUnique({
        where: { // 조건식
            email, // select가 없으면 전체를 반환한다.
        },
        select: { // id값만 반환
            id: true
        }
    });
    // if(user) {
    //     return false;
    // } else {
    //     return true;
    // }
    return !Boolean(user); // 바로 위의 방식과 동일하다.
}

//const usernameSchema = z.string().min(2).max(10); // String 타입의 2~10자까지를 설정
const formSchema = z.object({
    username: z.string({
        invalid_type_error: "이름은 한글로 입력해주세요.",
        required_error: "이름은 필수 입력값 입니다."
    }).trim().regex(/^[\uAC00-\uD7A3]+$/, "이름은 한글로만 입력해야합니다."),
    email: z.string().email().toLowerCase().refine(checkUniqueEmail, "이미 존재하는 이메일입니다."),
    password: z.string().min(PASSWORD_MIN_LENGTH).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH)
}).refine(checkPassword, {
    message: "비밀번호가 서로 일치하지 않습니다.",
    path: ["confirm_password"],
});

export async function createAccount(prevState: any, formData:FormData) {
    const data = {
        username: formData.get("username"),
        email: formData.get("email"),
        password: formData.get("password"),
        confirm_password: formData.get("confirm_password"),
    };
    //formSchema.parse(data); // 에러를 throw 한다. 그래서 try catch를 사용해서 작성해야한다.
    const result = await formSchema.safeParseAsync(data);
    if(!result.success) {
        return result.error.flatten();
    } else {
        // 이메일이 이미 존재하는지 확인 => zod에서 처리하도록 함.

        // 비밀번호 해싱
        const hashedPassword = await bcrypt.hash(result.data.password, 12);

        // 데이터베이스에 저장하기
        const user = await db.user.create({
            data: {
                username: result.data.username,
                email: result.data.email,
                password: hashedPassword
            },
            select: {
                id: true
            }
        });
        console.log(user)
        // 로그인 시켜주기 => 쿠키를 사용자에게 준다. [iron-session을 이용해서 저장하기]
        const session = await getSession();
        session.id = user.id
        await session.save();
        // 메인페이지로 redirect
        redirect("/profile")
    }
}