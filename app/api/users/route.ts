import {NextRequest} from "next/server";

// 기존에 사용하던 전통적인 방식이다.
export async function GET(request:NextRequest) {
    console.log(request);
    return Response.json({
        ok: true
    })
}

export async function POST(request:NextRequest) {
    const data = await request.json();
    return Response.json(data);
}