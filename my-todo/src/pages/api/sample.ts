import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const myName = formData.get("my-name");
    if (myName == "hoge") {
        return new Response(
            `<div id="error-message" hx-swap-oob="true">hogeはダメです。</div>`,
            { status: 200 }
        );
    }
    if (myName == "fuga") {
        return new Response(`<div>fugaはダメです。</div>`, { status: 400 });
    }
    if (myName == "fugafuga") {
        const res = new Response(`<div>fugafugaはダメです。</div>`, {
            status: 400,
        });
        res.headers.set("HX-Reswap", "innerHTML");
        return res;
    }
    if (myName == "piyo") {
        // 擬似的なタイムアウト
        return new Response(null, { status: 504 });
    }
    try {
        if (myName == "piyopiyo") {
            // 擬似的なDBエラー
            throw new Error("DBエラーpiyopiyoが発生しました。");
        }
    } catch (e: unknown) {
        if (e instanceof Error) {
            return new Response(e.message, { status: 500 });
        } else {
            console.log(e);
            return new Response("サーバーエラー内容をここに", { status: 500 });
        }
    }
    return new Response(`<div>${myName}</div>`, { status: 200 });
};
