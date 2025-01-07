export default function Loading() {
    return (
        <div className={"p-5 animate-pulse flex flex-col gap-5"}>
            {[...Array(10)].map((_, i) => (
                <div key={i} className={"*:rounded-md flex gap-5 animate-pulse"}>
                    <div className={"size-28 bg-neutral-700"}/>
                    <div className={"flex flex-col gap-2 *:rounded-md"}>
                        <div className={"bg-neutral-700 h-5 w-40"}/>
                        <div className={"bg-neutral-700 h-5 w-20"}/>
                        <div className={"bg-neutral-700 h-5 w-10"}/>
                    </div>
                </div>
            ))}
        </div>

    );
}