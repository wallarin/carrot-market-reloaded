import {InputHTMLAttributes} from "react";

interface InputProps {
    // HTMLInputElement 안에 아래의 속성들을 보유하고 체크하기 때문에 필요가 없어짐
    // type:string;
    // placeholder:string;
    // required:boolean;
    errors?:string[];
    //name: string;
}

export default function Input({errors = [], name, ...rest}: InputProps & InputHTMLAttributes<HTMLInputElement>) { //HTMLInputElement이 기본적인 Input의 속성값을 가지고 있다.
    console.log(rest);
    return (
        <div className={"flex flex-col gap-2"}>
            <input name={name}
                    // type={type}
                   className={"bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 transition focus:ring-4 ring-neutral-200 focus:ring-orange-500 border-none placeholder:text-neutral-400 px-3"}
                   // placeholder={placeholder}
                   // required={required}
                   {...rest}
            />
            {errors.map((error, index) => (
                <span key={index} className={"text-red-500 font-medium"}>{error}</span>
            ))}

        </div>
    );
}
