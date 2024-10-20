import { PrismaClient } from "@prisma/client";
import type { APIRoute } from "astro";

const prisma = new PrismaClient({
    log: ["query", "error", "info", "warn"],
});

export const GET: APIRoute = async ({ request }) => {
    // 動作確認が終わったので、このAPIは封鎖
    return new Response(null, { status: 404 });

    // Create
    const todo = await prisma.todo.create({
        data: { title: "abc" }, // not nullな項目は明示する必要あり
    });
    console.log("==Create", todo);

    // Read List
    const todoList = await prisma.todo.findMany({
        where: {
            is_deleted: false,
        },
    });
    console.log("==ReadList", todoList);

    // Read One
    const todoFoundById = await prisma.todo.findUnique({
        where: {
            id: BigInt(todo.id),
            is_deleted: false,
        },
    });
    console.log("==ReadOne", todoFoundById);

    // Update
    const updatedTodo = await prisma.todo.update({
        where: { id: todo.id },
        data: { done: true }, // 更新するデータ
    });
    console.log("==Update", updatedTodo);

    // Delete(Logical Delete)
    const deletedTodo = await prisma.todo.update({
        where: { id: todo.id },
        data: { is_deleted: true }, // 論理削除するデータ
    });
    console.log("==LogicalDelete", deletedTodo);

    // Read List
    const todoList2 = await prisma.todo.findMany({
        where: {
            is_deleted: false,
        },
    });
    console.log("==ReadList2", todoList2);

    // Read One
    const todoFoundById2 = await prisma.todo.findUnique({
        where: {
            id: BigInt(todo.id),
            is_deleted: false,
        },
    });
    console.log("==ReadOne2", todoFoundById2); // 取得できないのでnullになる

    return new Response(null, { status: 200 });
};
