import { PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";
import { diffJson } from "../../../apiScripts/diffJson.ts";
import { htmlRender } from "../../../apiScripts/htmlRender.ts";
import { isEmptyObject } from "../../../apiScripts/isEmptyObject.ts";
import EditableTodo from "../../../components/EditableTodo.astro";
import Todo from "../../../components/Todo.astro";

const prisma = new PrismaClient({
    log: ["query", "error", "info", "warn"],
});

export const GET: APIRoute = async ({ request, cookies, params }) => {
    try {
        const id = params.id;
        if (!id) {
            return new Response("The id is null.", { status: 400 });
        }
        const url = new URL(request.url);
        const isEditable = Boolean(url.searchParams.get("edit"));

        // 既存データを取得
        const todo = await prisma.todo.findUnique({
            where: {
                id: parseInt(id),
                is_deleted: false,
            },
        });
        if (todo == null) {
            return new Response(null, { status: 404 });
        }
        return await htmlRender(
            isEditable ? EditableTodo : Todo, // クエリパラメーターで切り替える
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

export const PUT: APIRoute = async ({ request, cookies, params }) => {
    try {
        // URLの/api/todos/[id] のid部分を受け取る
        const id = params.id;
        if (!id) {
            return new Response("The id is null.", { status: 400 });
        }
        const formData = await request.formData();
        const title = formData.get("title")?.toString();
        if (!title) {
            console.log("titleなし");
            return new Response("The title is null.", { status: 400 });
        }
        const done = Boolean(formData.get("done"));

        // 更新したい値
        const newTodoValue = {
            title: title,
            done: done,
            is_deleted: false,
        };

        // 更新対象をデータベースから取得
        const todo = await prisma.todo.findUnique({
            where: {
                id: BigInt(id),
                is_deleted: false,
            },
        });
        if (todo == null) {
            return new Response("The todo is not found.", { status: 404 });
        }
        const { id: _, ...todoValue } = todo; // idを_変数に代入、それ以外をtodoValue変数に代入（ようするに、idフィールドを除外）
        // 現在値から更新したい値の差分を作成
        const diff = diffJson(todoValue, newTodoValue);

        // 差分がなければ更新不要なので、早期リターン
        if (isEmptyObject(diff)) {
            return await htmlRender(
                Todo,
                {
                    todo: todo,
                },
                200
            );
        }

        // 更新処理
        const updatedTodo = await prisma.todo.update({
            where: { id: BigInt(id) },
            data: diff, // 更新する差分データ
        });
        return await htmlRender(
            Todo,
            {
                todo: updatedTodo,
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

export const DELETE: APIRoute = async ({ request, cookies, params }) => {
    try {
        const id = params.id;
        if (!id) {
            return new Response(null, { status: 400 });
        }
        await prisma.todo.update({
            where: { id: BigInt(id) },
            data: { is_deleted: true }, // 論理削除するデータ
        });
        return new Response(null, { status: 200 });
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
