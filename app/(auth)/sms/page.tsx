"use client";

import Input from "@/app/components/input";
import Button from "@/app/components/button";
import {useFormState} from "react-dom";
import {smsLogin} from "@/app/(auth)/sms/actions";

const initialState = {
    token: false,
    error: undefined,
}

export default function SMSLogin() {
    const [state, dispatch] = useFormState(smsLogin, initialState);
    return (
        <div className={"flex flex-col gap-10 py-8 px-6"}>
            <div className={"flex flex-col gap-2 *:font-medium"}>
                <h1 className={"text-2xl"}>SMS 로그인</h1>
                <h2 className={"text-xl"}>휴대전화로 로그인하세요!</h2>
            </div>
            <form action={dispatch} className={"flex flex-col gap-3"}>
                { state.token? (
                    <Input
                        name={"token"}
                        key={"token"} // key를 넣어주지 않으면 value가 그대로 살아있음
                        type={"number"}
                        placeholder={"인증번호를 입력해주세요."}
                        required={true}
                        min={100000}
                        max={999999}
                        errors={state.error?.formErrors}
                    />
                ) : <Input
                    name={"phone"}
                    type={"text"}
                    placeholder={"휴대전화를 입력해주세요."}
                    required={true}
                    errors={state.error?.formErrors}
                />}
                <Button text={state.token ? "인증" : "인증 문자 보내기"} />
            </form>
        </div>
    );
}