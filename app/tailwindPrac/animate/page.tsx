export default function Page() {
    return (
        <div
            className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-4" /* *: 자식 요소에 적용 has-[.peer]: 자식에 peer가 존재하면 적용 */>
            {["nico", "Me", "You", "Yourself"].map((person, index) =>
                <div key={index}
                     className="flex items-center gap-5 *:animate-pulse"> {/* odd: 홀수행 적용 / even: 짝수행 적용 last: 마지막 자식 선택 first: 첫번째 자식 선택 */}
                    <div className="size-7 bg-blue-400 rounded-full"/>
                    <div className="w-40 h-4 rounded-full bg-gray-400"/>
                    <div className="w-20 h-4 rounded-full bg-gray-400"></div>
                </div>)}
            {["nico", "Me", "You", "Yourself"].map((person, index) =>
                <div key={index}
                     className="flex items-center gap-5"> {/* odd: 홀수행 적용 / even: 짝수행 적용 last: 마지막 자식 선택 first: 첫번째 자식 선택 */}
                    <div className="size-7 bg-blue-400 rounded-full"/>
                    <span className="text-lg font-medium">{person}</span>
                    <div
                        className="size-5 animate-bounce bg-red-500 text-white flex items-center justify-center rounded-full">
                        <span>{index}</span>
                    </div>
                </div>)}
            {["nico", "Me", "You", "Yourself", ""].map((person, index) =>
                <div key={index}
                     className="flex items-center gap-5"> {/* odd: 홀수행 적용 / even: 짝수행 적용 last: 마지막 자식 선택 first: 첫번째 자식 선택 */}
                    <div className="size-7 bg-blue-400 rounded-full"/>
                    <span
                        className="text-lg font-medium empty:w-24 empty:h-5 empty:rounded-full empty:animate-pulse empty:bg-gray-300">{person}</span>
                    <div
                        className="size-5 bg-red-500 text-white flex items-center justify-center rounded-full relative">
                        <span className="z-10">{index}</span>
                        <div className="size-5 bg-red-500 rounded-full animate-ping absolute"/>
                    </div>
                </div>)}
        </div>
    );
}