export default function DeliveryCard() {
    return (
        <main
            className='bg-gray-300 h-screen flex items-center p-24 dark:bg-gray-700 flex-col justify-center'> {/* h-screen: 100% viewport height 만큼 설정 */}
            <div className='bg-white w-full max-w-screen-sm shadow-lg p-5 rounded-2xl font-bold dark:bg-gray-600'>
                <div className='flex justify-between items-center'> {/* 상단 부분 이름 / 프로필 이미지 */}
                    <div className='flex flex-col'>
                <span
                    className='text-gray-500 text-lg -mb-1 dark:text-gray-300'>In transit</span> {/* -mb-1: 설정된 rem 만큼의 margin-bottom을 빼준다. */}
                        <span className='text-3xl dark:text-white'>Coolblue</span>
                    </div>
                    <div className='bg-orange-500 size-14 rounded-full'></div>
                    {/* 이미지 사진 위치 */} {/* size-14: w-14 h-14를 한번에 적용시켜준다. */}
                </div>
                <div
                    className='flex items-center gap-2 my-4'> {/* 중간 부분 요일 / 시간 */} {/* mr-3을 아래 TODAY span에서 설정하는 것도 좋지만 여기에서 flex로 처리하고 gap을 주는게 더 명확해보인다. */}
                    <span
                        className='py-1.5 px-4 font-semibold bg-green-500 text-gray-100 uppercase rounded-2xl transition hover:bg-green-600 hover:scale-110'>Today</span>
                    <span className='text-lg dark:text-gray-100'>9:30-10:30</span>
                </div>
                <div className='relative mb-8'> {/* 로딩바 */}
                    <div className='w-full h-2 bg-gray-200 rounded-lg absolute'></div>
                    <div className='w-2/3 h-2 bg-green-600 rounded-lg absolute'></div>
                </div>
                <div
                    className='flex justify-between items-center text-gray-500 dark:text-gray-300'> {/* 배달현황 안내 문구 */}
                    <span className='text-gray-500'>Expected</span>
                    <span>Sorting center</span>
                    <span>In transit</span>
                    <span
                        className='text-gray-300 dark:text-gray-400'>Delivered</span> {/* 각각 해주는 방법도 있지만 상위 div에 설정 후 다른 부분만 바꾸는 것도 좋다. */}
                </div>
            </div>
        </main>
    );
};