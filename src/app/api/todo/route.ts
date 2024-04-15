import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/db";
import { ObjectId } from "mongodb";

export async function GET() {

    const client = await clientPromise;

    const collection = client.db().collection("todos");

    try {

        const todos = await collection.find({}).toArray();

        return NextResponse.json(todos, { status: 200 });

    } catch (error) {

        return NextResponse.json({ message: "Error Fetching Todos" }, { status: 500 });

    }

};

export async function POST(req: any) {

    const { text } = await req.json();

    const client = await clientPromise;

    const collection = client.db().collection("todos");

    try {

        const todo = { text: text, completed: false };

        await collection.insertOne(todo);

        return NextResponse.json(todo, { status: 201 });

    } catch (error) {

        return NextResponse.json(error, { status: 500 });

    }

};

export async function PUT(req: NextRequest) {

    const { id, text, completed } = await req.json();

    const client = await clientPromise;

    const collection = client.db().collection("todos");

    try {

        await collection.updateOne({ _id: new ObjectId(id) }, { $set: { text, completed } });

        return NextResponse.json({ message: "Todo Updated Successfully" }, { status: 200 });

    } catch (error) {

        return NextResponse.json({ message: "Error Updating Todo" }, { status: 500 });

    }

};

export async function DELETE(req: Request) {

    const { id } = await req.json();

    const client = await clientPromise;

    const collection = client.db().collection("todos");

    try {

        await collection.deleteOne({ _id: new ObjectId(id) });

        return NextResponse.json({ message: "Todo Deleted Successfully" }, { status: 200 });

    } catch (error) {

        return NextResponse.json({ message: "Error Deleting Todo" }, { status: 500 });

    }

};