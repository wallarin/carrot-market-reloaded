"use client";

import { useFormStatus } from "react-dom"

interface ButtonProps {
    //loading: boolean;
    text: string;
}

export default function Button({text}: ButtonProps) {
    // useFormStatus는 form의 자식에게서만 사용이 가능하다. form이 직접 사용은 불가능
    const { pending } = useFormStatus();
    return (
        <button className={"primary-btn h-10 font-semibold disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed"}
                disabled={ pending }>
            {pending ? "로딩중.." : text}
        </button>
    )
}