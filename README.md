# 프로젝트 생성
```bash
$npx create-next-app@14 // 프로젝트를 생성할 폴더 위치 이전 경로에서 커맨드 입력 [nextJS 14버전을 사용한다.]
√ What is your project named? ... carrot-market-reloaded // 프로젝트 명 설정
√ Would you like to use TypeScript? ... No / "Yes" // 타입스크립트(변수, 함수등의 타입을 지정하고 OOP의 개념을 추가할 수 있는 JavaScript의 확장 언어) 사용여부
√ Would you like to use ESLint? ... No / "Yes" // ESLint(JavaScript와 TypeScript의 문법과 스타일을 분석하여 문제를 찾아주는 정적 코드 분석기) 사용여부
√ Would you like to use Tailwind CSS? ... No / "Yes" // CSS가 정의되어있는 라이브러리 ex) bootstrap
√ Would you like to use `src/` directory? ... "No" / Yes // 코드 파일을 src 폴더안에 넣을건지 팀프로젝트, 대규모일때의 명확하고 체계적인 디렉터리 구조 유지 가능
√ Would you like to use App Router? (recommended) ... No / "Yes" // 페이지 라우트(경로)를 더 구조적으로 처리하는 방식
√ Would you like to customize the default import alias (`@/*`)? ... "No" / Yes
Creating a new Next.js app in 프로젝트/폴더
```

# 프로젝트 실행
1. 터미널 창을 연다.
2. 프로젝트 경로에 터미널이 들어가져 있는지 확인한다.
3. "npm run dev"를 입력한다.
4. "localhost:3000"에 접속한다.
---

# 프로젝트 초기화
* /app/page.tsx, /app/globals.css의 내용을 정리한다.
```javascript
// page.tsx의 파일 초기화 후
export default function Home() {
    return (
        <main></main>
    );
}
```

```css
<!-- /app/globals.css의 초기화 후 -->
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Github와 내 프로젝트 연결하기

※ Github Repository는 미리 생성해 놓는게 편리하다.
1. 새로운 **터미널 창**을 연다.
2. **프로젝트 경로**로 이동한다.
3. git remote add origin https://github.com/wallarin/carrot-market-reloaded.git // 원격 저장소 이름 입력

**본인의 repository로 변경 필수!**

4. "git status" ※ 변경된 파일 확인으로 필수는 아니다.
5. git add .
6. git commit -m "커밋 메시지"
7. git push -u origin main

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
