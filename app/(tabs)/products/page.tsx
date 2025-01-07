import db from "@/lib/db";
import ListProduct from "@/app/components/list-products";

async function getProducts() {
    const products = await db.product.findMany({
        select: {
            title: true,
            price: true,
            created_at: true,
            photo: true,
            id: true
        },
        orderBy: {
            created_at: "desc"
        }
    });
    return products
}

export default async function Products () {
    const products = await getProducts();
    return (
        <div className={"p-5 flex flex-col gap-5"}>
            {/*{products.map((products) => <ListProducts id={products.id} title={products.title} />)} 하나씩 설정할 수 있지만 아래처럼 하면 product의 모든 값을 넘겨준다. */}
            {products.map((product) => (<ListProduct key={product.id} {...product} />))}
        </div>
    );
}