"use server";

import twilio from "twilio";
import {z} from "zod";
import validator from 'validator';
import {redirect} from "next/navigation";
import db from "@/lib/db";
import crypto from "crypto";
import {saveSession} from "@/lib/session";

const phoneSchema = z.string().trim()
    .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), "올바른 휴대전화 번호를 입력하세요.");

async function tokenExists(token: number) {
    const exists = await db.sMSToken.findUnique({
        where: {
            token: token.toString()
        },
        select: {
            id: true
        }
    })
    // if (exists) {
    //     return true;
    // } else {
    //     return false;
    // }
    return Boolean(exists);
}

const tokenSchema = z.coerce.number() // number로 강제 형변환을 해준다.
    .min(100000).max(999999)
    .refine(tokenExists, "유효하지 않은 토큰입니다.");

interface ActionState {
    token: boolean;
}

async function getToken() {
    const token = crypto.randomInt(100000, 999999).toString();
    // 중복된 token을 방지하기 위하여 조회
    const exists = await db.sMSToken.findUnique({
        where: {
            token
        },
        select: {
            id: true,
        }
    });

    if (exists) {
        return getToken(); // 존재하면 재실행
    } else {
        return token;
    }
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
            await db.sMSToken.deleteMany({ // 사용자가 제출한 전화번호를 가진 token 삭제
                where: {
                    user: {
                        phone: result.data
                    }
                }
            })
            // 이전 Token 삭제하기 추가
            const token = await getToken();
            // 새로운 Token 생성
            await db.sMSToken.create({
                data: {
                    token,
                    // token 정보를 저장할때 연결될 user 필요하다.
                    // 하지만 우리는 이 user가 존재하는지 알 수가 없다.
                    user: {
                        connectOrCreate: { // 조건을 통해 값이 있다면 연결하거나, 없다면 연결할 값을 생성한다.
                            where: {
                                phone: result.data
                            },
                            create: {
                                username: crypto.randomBytes(10).toString("hex"), // 랜덤한 username을 생성한다.
                                phone: result.data
                            }
                        }
                    }
                }
            })
            // twilio를 사용하여 SMS 인증코드 발송
            const client = twilio(
                process.env.TWILIO_ACCOUNT_SID,
                process.env.TWILIO_AUTH_TOKEN
            );
            await client.messages.create({
                body: `당신의 캐럿마켓 인증코드는 [${token}] 입니다.`,
                from: process.env.TWILIO_PHONE_NUMBER!,
                // to: process.env.MY_PHONE_NUMBER!,
                to: result.data // 사용자에게 보내줘야하지만 체험판이기 때문에 불가능
            })
            return {
                token: true,
            }
        }
    } else {
        const result = await tokenSchema.safeParseAsync(token); // token이 올바른지 검증
        if(!result.success) {
            return {
                token: true,
                // 에러메시지 추가
                error: result.error.flatten(),
            }
        } else {
            // token의 userId 가져오기
            const token = await db.sMSToken.findUnique({
                where: {
                    token: result.data.toString()
                },
                select: {
                    id: true,
                    userId: true,
                }
            })
            await saveSession(token!.userId);
            await db.sMSToken.delete({
                where: {
                    id: token!.id
                }
            })
            // 로그인 시켜주기
            redirect("/profile")
        }
    }
}
