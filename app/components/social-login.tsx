import Link from "next/link";
import {ChatBubbleOvalLeftEllipsisIcon} from "@heroicons/react/24/solid";
import {FaGithub} from "react-icons/fa";

export default function SocialLogin() {
    return (
        <>
            <div className={"w-full h-px bg-neutral-500"}/>
            <div className={"flex flex-col gap-3"}>
                <Link href={"/github/start"} className={"primary-btn flex h-10 items-center justify-center gap-3"}>
                    <span className={""}><FaGithub className={"size-6"}/></span>
                    <span className={""}>GitHub로 계속하기</span>
                </Link>
                <Link href={"/sms"} className={"primary-btn flex h-10 items-center justify-center gap-3"}>
                    <span className={""}><ChatBubbleOvalLeftEllipsisIcon className={"h-6 w-6"}/></span>
                    <span className={""}>SMS로 계속하기</span>
                </Link>
            </div>
        </>
    )
}