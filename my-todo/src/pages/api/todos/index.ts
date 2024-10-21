import { PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";
import { htmlRender } from "../../../apiScripts/htmlRender";
import Todo from "../../../components/Todo.astro";
import TodoRows from "../../../components/TodoRows.astro";

const prisma = new PrismaClient({
    log: ["query", "error", "info", "warn"],
});

export const GET: APIRoute = async ({ request, cookies }) => {
    try {
        const todos = await prisma.todo.findMany({
            where: {
                is_deleted: false,
            },
            orderBy: {
                id: "asc",
            },
        });
        return await htmlRender(
            TodoRows,
            {
                todos: todos,
            },
            200
        );
    } catch (error) {
        console.log(error);
        let errorMessage: string;
        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = String(error);
        }
        return new Response(errorMessage, { status: 500 });
    }
};

export const POST: APIRoute = async ({
    request /*cookie-session方式で認可管理したい場合は第2引数にcookies*/,
}) => {
    const formData = await request.formData();
    const title = formData.get("title")?.toString();
    if (!title) {
        return new Response("タイトルがありません。", { status: 400 });
    }
    try {
        const todo = await prisma.todo.create({
            data: { title: title },
        });
        return await htmlRender(
            Todo,
            {
                todo: todo,
            },
            200
        );
    } catch (error) {
        console.log(error);
        let errorMessage: string;

        if (error instanceof Error) {
            errorMessage = error.message;
        } else {
            errorMessage = String(error);
        }
        return new Response(errorMessage, { status: 500 });
    }
};
