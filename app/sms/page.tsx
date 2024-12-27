import FormInput from "@/app/components/form-input";
import FormButton from "@/app/components/form-btn";
import SocialLogin from "@/app/components/social-login";

export default function SMSLogin() {
    return (
        <div className={"flex flex-col gap-10 py-8 px-6"}>
            <div className={"flex flex-col gap-2 *:font-medium"}>
                <h1 className={"text-2xl"}>SMS 로그인</h1>
                <h2 className={"text-xl"}>휴대전화로 로그인하세요!</h2>
            </div>
            <form className={"flex flex-col gap-3"}>
                <FormInput type={"number"} placeholder={"휴대전화를 입력해주세요."} required={true} errors={[]} />
                <FormInput type={"number"} placeholder={"인증번호를 입력해주세요."} required={true} errors={[]} />
                <FormButton loading={false} text={"인증"} />
            </form>
        </div>
    );
}