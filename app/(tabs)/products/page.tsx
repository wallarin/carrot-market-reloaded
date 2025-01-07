import db from "@/lib/db";
import ProductList from "@/app/components/product-list";
import {Prisma} from "@prisma/client";

async function getInitialProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true
        },
        take: 1, // == limit => 1개의 상품만 가져오겠다.

        orderBy: {
            created_at: "desc"
        }
    });
    return products
}

export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts> // Prisma가 반환되는 Type을 유추한다.

export default async function Products () {
    const initialProducts = await getInitialProducts();
    return (
        <div>
            <ProductList initialProducts={initialProducts} />
        </div>
    );
}