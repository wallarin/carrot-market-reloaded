export default function Textbox() {
    return (
        <main
            className='bg-gray-300 h-screen flex items-center p-24 dark:bg-gray-700 flex-col justify-center sm:bg-red-100 md:bg-orange-100 lg:bg-yellow-100'> {/* h-screen: 100% viewport height 만큼 설정 */}
            <div className="
                bg-white w-full max-w-screen-sm shadow-lg p-5 rounded-2xl font-bold dark:bg-gray-600 flex flex-col gap-2
                transition  md:flex-row *:outline-none has-[.peer]:bg-yellow-300" /* *: 자식 요소에 적용 has-[.peer]: 자식에 peer가 존재하면 적용 */
            >
                <input className="
                w-full rounded-full h-10 bg-gray-200 pl-5
                ring ring-transparent focus:ring-orange-400 focus:ring-offset-2
                transition-shadow placeholder:drop-shadow invalid:focus:ring-red-500 peer"
                       type="text"
                       placeholder={"Email address"}
                />
                <span className="text-red-500 hidden peer-invalid:block">
                    Email is required
                </span>
                <button className="
            bg-black  bg-opacity-50 text-white py-2 rounded-full
            active:scale-90 focus:scale-90 transition-transform font-medium
            md:px-8 peer-invalid:bg-red-300" /* bg-gradient-to-tr from-cyan-400 via-green-400 to-purple-400 그라데이션 효과 */
                >Login
                </button>
            </div>
        </main>
    );
}