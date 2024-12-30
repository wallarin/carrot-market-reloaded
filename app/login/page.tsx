"use client"

import Input from "@/app/components/input";
import FormButton from "@/app/components/button";
import SocialLogin from "@/app/components/social-login";
import {useFormState} from "react-dom";
import {login} from "@/app/login/actions";
import {PASSWORD_MIN_LENGTH} from "@/lib/constants";

export default function Login() {

    // 전통적인 방식
    // const onClick = async () => {
    //     const response = await fetch("/api/users", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             username: "nice",
    //             password: "1234"
    //         })
    //     })
    //     console.log(await response.json());
    // }




    const [state, dispatch] = useFormState(login, null);

    return (
        <div className={"flex flex-col gap-10 py-8 px-6"}>
            <div className={"flex flex-col gap-2 *:font-medium"}>
                <h1 className={"text-2xl"}>안녕하세요!</h1>
                <h2 className={"text-xl"}>이메일과 패스워드로 로그인하세요!</h2>
            </div>
            <form action={dispatch} className={"flex flex-col gap-3"}>
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
                    minLength={PASSWORD_MIN_LENGTH}
                    errors={state?.fieldErrors.password}
                />
                <FormButton text={"로그인"} />
            </form>
            {/*<span onClick={onClick}><FormButton loading={false} text={"테스트 로그인"} /></span>*/}
            <SocialLogin />
        </div>
    );
}