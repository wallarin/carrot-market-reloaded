"use client";

import Input from "@/app/components/input";
import Button from "@/app/components/button";
import SocialLogin from "@/app/components/social-login";
import {useFormState} from "react-dom";
import {createAccount} from "@/app/create-account/actions";
import {PASSWORD_MIN_LENGTH} from "@/lib/constants";

export default function CreateAccount() {
    const [state, dispatch] = useFormState(createAccount, null);
    return (
        <div className={"flex flex-col gap-10 py-8 px-6"}>
            <div className={"flex flex-col gap-2 *:font-medium"}>
                <h1 className={"text-2xl"}>안녕하세요!</h1>
                <h2 className={"text-xl"}>아래 양식을 입력 후 가입하세요!</h2>
            </div>
            <form action={dispatch} className={"flex flex-col gap-3"}>
                <Input
                    name={"username"}
                    type={"text"}
                    placeholder={"이름을 입력해주세요."}
                    required={true}
                    errors={state?.fieldErrors.username}
                />
                <Input
                    name={"email"}
                    type={"email"}
                    placeholder={"이메일을 입력해주세요."}
                    required={true}
                    errors={state?.fieldErrors.email}
                />
                <Input
                    name={"password"}
                    type={"password"}
                    placeholder={"비밀번호를 입력해주세요."}
                    required={true}
                    errors={state?.fieldErrors.password}
                    minLength={PASSWORD_MIN_LENGTH}
                />
                <Input
                    name={"confirm_password"}
                    type={"password"}
                    placeholder={"비밀번호를 다시 입력해주세요."}
                    required={true}
                    errors={state?.fieldErrors.confirm_password}
                    minLength={PASSWORD_MIN_LENGTH}
                />
                <Button text={"가입하기"} />
            </form>
            <SocialLogin />
        </div>
    );
}