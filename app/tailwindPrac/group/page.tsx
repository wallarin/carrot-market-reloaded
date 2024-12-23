export default function Group() {
    return (
        <div className="bg-white shadow-lg p-5 rounded-3xl w-full max-w-screen-sm flex flex-col gap-4">
            <div className="group flex flex-col">
                <input className="bg-gray-100 w-full" placeholder="이메일을 작성하세요."/>
                <span className={"group-focus-within:block hidden"}>유효한 이메일인지 확인하세요..</span>
                <button>가입</button>
            </div>
        </div>
    );
}