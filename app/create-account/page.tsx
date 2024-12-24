import Link from "next/link";
import {ChatBubbleOvalLeftEllipsisIcon} from "@heroicons/react/24/solid";
import FormInput from "@/app/components/form-input";
import FormButton from "@/app/components/form-btn";

export default function CreateAccount() {
    return (
        <div className={"flex flex-col gap-10 py-8 px-6"}>
            <div className={"flex flex-col gap-2 *:font-medium"}>
                <h1 className={"text-2xl"}>안녕하세요!</h1>
                <h2 className={"text-xl"}>아래 양식을 입력 후 가입하세요!</h2>
            </div>
            <form className={"flex flex-col gap-3"}>
                <FormInput type={"text"} placeholder={"이름을 입력해주세요."} required={true} errors={[]} />
                <FormInput type={"email"} placeholder={"이메일을 입력해주세요."} required={true} errors={[]} />
                <FormInput type={"password"} placeholder={"비밀번호를 입력해주세요."} required={true} errors={[]} />
                <FormInput type={"password"} placeholder={"비밀번호를 다시 입력해주세요."} required={true} errors={[]} />
                <FormButton loading={false} text={"가입하기"} />
            </form>
            <div className={"w-full h-px bg-neutral-500"} />
            <div className={""}>
                <Link href={"/sms"} className={"primary-btn flex h-10 items-center justify-center gap-3"}>
                    <span className={""}><ChatBubbleOvalLeftEllipsisIcon className={"h-6 w-6"} /></span>
                    <span className={""}>SMS로 가입하기</span>
                </Link>
            </div>
        </div>
    );
}