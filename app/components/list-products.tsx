import Link from "next/link";
import Image from "next/image";
import {formatToTimeAgo, formatToWon} from "@/lib/utils";

interface ListProductProps {
    title: string;
    price: number;
    created_at: Date;
    photo: string;
    id: number;
}

export default function ListProduct({ title, price, created_at, photo,id }: ListProductProps) {
    return (
        <Link href={`/products/${id}`} className={"flex gap-5"} >
            <div className={"relative size-28 rounded-md overflow-hidden"}>
                <Image fill className={"object-cover"} src={photo} alt={title} />
                {/* Image 컴포넌트는 기본적으로 Width, Height의 값을 넣어줘야한다.
                    하지만 우리가 이미지의 크기를 정확하게 모르는 경우 fill (default: absolute)로 대체가 가능하고
                    상위의 부모 태그를 relative로 설정하고 그 크기를 조절하여 사용하면 된다.
                */}
            </div>
            <div className={"flex flex-col gap-1 *:text-white"}>
                <span className={"text-lg"}>{title}</span>
                <div className={"*:text-white"}>
                    {formatToTimeAgo(created_at.toString()) === "0일 전" ? (
                        <div className={"flex flex-row justify-between items-center *:text-white"}>
                            <span className={"text-sm text-neutral-500"}>오늘</span>
                            <span className={"text-xs bg-orange-400 p-1 rounded-lg font-semibold"}>NEW</span>
                        </div>
                    ): (
                        <span className={"text-sm text-neutral-500"}>{formatToTimeAgo(created_at.toString())}</span>
                    )}
                </div>
                <span className={"text-lg font-semibold"}>\ {formatToWon(price)}원</span>
            </div>
        </Link>
    );
}