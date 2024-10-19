import type { APIRoute } from "astro";
import { htmlRender } from "../../apiScripts/htmlRender";
import Message, { type MessageProps } from "../../components/Message.astro";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const myName = formData.get("my-name") as string | null;
    // 異常系の早期リターン
    if (myName == "hoge") {
        const args: MessageProps = {
            message: "hogeはダメです。",
            id: "error-message",
            isHxSwapOob: true,
        };
        return htmlRender(Message, args, 200);
    }
    if (myName == "fuga") {
        const args: MessageProps = {
            message: "fugaはダメです。",
        };
        return htmlRender(Message, args, 400);
    }
    if (myName == "fugafuga") {
        const args: MessageProps = {
            message: "fugafugaはダメです。",
        };
        return htmlRender(Message, args, 400, "innerHTML");
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
    // 正常系
    const args: MessageProps = {
        message: myName ?? "",
    };
    return htmlRender(Message, args, 200);
};
