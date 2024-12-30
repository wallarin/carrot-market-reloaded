"use server"
import { z } from "zod";
import {PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR} from "@/lib/constants";

const checkPassword = ({password, confirm_password}:
                           {password:string, confirm_password:string}) => password === confirm_password

//const usernameSchema = z.string().min(2).max(10); // String 타입의 2~10자까지를 설정
const formSchema = z.object({
    username: z.string({
        invalid_type_error: "이름은 한글로 입력해주세요.",
        required_error: "이름은 필수 입력값 입니다."
    }).trim().regex(/^[\uAC00-\uD7A3]+$/, "이름은 한글로만 입력해야합니다."),
    email: z.string().email().toLowerCase(),
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
    const result = formSchema.safeParse(data);
    if(!result.success) {
        return result.error.flatten();
    } else {
        console.log(result.data);
    }
}