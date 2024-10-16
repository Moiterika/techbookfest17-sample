import type { Props } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/render/astro/factory.js";

export const htmlRender = async <T extends Props>(
    astro: AstroComponentFactory,
    astroProp: T,
    status: number
) => {
    const container = await AstroContainer.create();
    // HTMLとして出力した文字列が挿入される
    const htmlContent = await container.renderToString(astro, {
        props: astroProp,
    });
    const res = new Response(htmlContent, { status: status });
    res.headers.set("Content-Type", "text/html");
    return res;
};
