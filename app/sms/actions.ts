"use server";

import {z} from "zod";
import validator from 'validator';
import {redirect} from "next/navigation";

const phoneSchema = z.string().trim()
    .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), "올바른 휴대전화 번호를 입력하세요.");

const tokenSchema = z.coerce.number() // number로 강제 형변환을 해준다.
    .min(100000).max(999999);

interface ActionState {
    token: boolean;
}

export async function smsLogin(prevState:ActionState, formData: FormData) {
    const phone = formData.get("phone");
    const token = formData.get("token");

    if (!prevState.token) { // false 상태일 때 체크
        // 처음 호출했을때 동작한다.
        const result = phoneSchema.safeParse(phone);
        if (!result.success) {
            return {
                token: false,
                error: result.error.flatten(),
            }
        } else {
            return {
                token: true,
            }
        }
    } else {
        const result = tokenSchema.safeParse(token);
        if(!result.success) {
            return {
                token: true,
                // 에러메시지 추가
                error: result.error.flatten(),
            }
        } else {
            redirect("/")
        }
    }
}
