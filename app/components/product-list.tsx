"use client"

import ListProduct from "@/app/components/list-products";
import {InitialProducts} from "@/app/(tabs)/products/page";
import {useState} from "react";
import {getMoreProducts} from "@/app/(tabs)/products/actions";

interface ProductListProps {
    initialProducts: InitialProducts // Prisma에게 요청해서 가져오는 방법
    /* 직접적으로 명시하는 방법
        initialProducts: {
            id: number;
            title: string;
            price: number;
            photo: string;
            created_at: Date;
        }[];
    */
}

export default function ProductList({initialProducts} : ProductListProps) {
    const [products, setProducts] = useState(initialProducts);
    const [isLoading, setIsLoading] = useState(false);
    const keepMoreProducts = async () => {
        setIsLoading(true);
        const newProducts = await getMoreProducts(1);
        setProducts((prev) => [...prev, ...newProducts])
        setIsLoading(false);
    }
    return (
        <div className={"p-5 flex flex-col gap-5"}>
            {/*{products.map((products) => <ListProducts id={products.id} title={products.title} />)} 하나씩 설정할 수 있지만 아래처럼 하면 product의 모든 값을 넘겨준다. */}
            {products.map((product) => (
                <ListProduct key={product.id} {...product} />
            ))}
            <button
                onClick={keepMoreProducts}
                disabled={isLoading}
                className={"text-sm font-semibold bg-orange-500 w-fit mx-auto px-3 py-2 rounded-md hover:opacity-90 active:scale-95"}
            >{isLoading ? "로딩 중.." : "더보기"}</button>
        </div>
    );
}