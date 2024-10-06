import type { APIRoute } from "astro";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const myName = formData.get("my-name");
    return new Response(`<div>${myName}</div>`, { status: 200 });
};
