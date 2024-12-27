import FormInput from "@/app/components/form-input";
import FormButton from "@/app/components/form-btn";
import SocialLogin from "@/app/components/social-login";

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

    async function handleForm() {
        "use server";
        console.log("haha")
    }

    return (
        <div className={"flex flex-col gap-10 py-8 px-6"}>
            <div className={"flex flex-col gap-2 *:font-medium"}>
                <h1 className={"text-2xl"}>안녕하세요!</h1>
                <h2 className={"text-xl"}>이메일과 패스워드로 로그인하세요!</h2>
            </div>
            <form action={handleForm} className={"flex flex-col gap-3"}>
                <FormInput type={"email"} placeholder={"이메일을 입력해주세요."} required={true} errors={[]} />
                <FormInput type={"password"} placeholder={"비밀번호를 입력해주세요."} required={true} errors={[]} />
                <FormButton loading={false} text={"로그인"} />
            </form>
            {/*<span onClick={onClick}><FormButton loading={false} text={"테스트 로그인"} /></span>*/}
            <SocialLogin />
        </div>
    );
}