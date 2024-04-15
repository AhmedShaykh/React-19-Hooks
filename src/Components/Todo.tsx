"use client";
import { useEffect, useState } from "react";

type Todo = {
    _id: string;
    text: string | null;
    completed: boolean;
};

const Todo = () => {

    const [isLoading, setLoading] = useState(true);

    const [todos, setTodos] = useState<Todo[]>([]);

    const [newTodoText, setNewTodoText] = useState<string>("");

    const [editTodo, setEditTodo] = useState<Todo | null>(null);

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/todo`)
            .then((res) => res.json())
            .then((data) => {
                setTodos(data);
                setLoading(false);
            });

    }, []);

    const addTodo = async () => {

        if (!newTodoText) return;

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/todo`, {
            method: "POST",
            body: JSON.stringify({ text: newTodoText }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        console.log("Data", data);

        setTodos([...todos, data]);

        setNewTodoText("");

    };

    const toggleTodo = async (id: string, completed: boolean) => {

        const response = await fetch("/api/todo", {
            method: "PUT",
            body: JSON.stringify({ id, completed: !completed }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status === 200) {
            setTodos(
                todos.map((todo: any) =>
                    todo._id === id ? { ...todo, completed: !completed } : todo
                )
            );
        }

    };

    const deleteTodo = async (id: string) => {

        const response = await fetch("/api/todo", {
            method: "DELETE",
            body: JSON.stringify({ id }),
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.status === 200) {
            setTodos(todos.filter((todo: any) => todo._id !== id));
        }

    };

    const handleEdit = (todo: Todo) => {

        setEditTodo(todo);

    };

    const handleSave = async () => {

        if (!editTodo) return;

        const response = await fetch("/api/todo", {
            method: "PUT",
            body: JSON.stringify({ id: editTodo._id, text: editTodo.text, completed: editTodo.completed }),
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (response.status === 200) {
            setTodos(
                todos.map((todo: any) =>
                    todo._id === editTodo._id ? { ...todo, text: editTodo.text } : todo
                )
            );
            setEditTodo(null);
        }

    };

    return (
        <div className="flex lg:flex-row flex-col gap-5 justify-center w-full mx-auto">
            <div className="sm:w-9/12 lg:w-6/12 w-full px-4 my-4 flex flex-col justify-start items-center">
                {editTodo ? (
                    <>
                        <input
                            className="w-full lg:w-8/12 bg-black border-2 border-zinc-400 py-3 text-xl rounded-lg outline-none px-3"
                            onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })}
                            value={editTodo.text!}
                            type="text"
                        />
                        <button
                            className="rounded-lg border border-black bg-black py-2.5 font-medium text-green-500 px-5 mt-12"
                            onClick={handleSave}
                        >
                            Save TODO
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            className="w-full lg:w-8/12 bg-black border-2 border-zinc-400 py-3 text-xl rounded-lg outline-none px-3"
                            onChange={(e) => setNewTodoText(e.target.value)}
                            placeholder="Add TODO..."
                            value={newTodoText}
                            type="text"
                        />
                        <button
                            className="rounded-lg border border-black bg-black py-2.5 font-medium text-white px-5 mt-12"
                            onClick={addTodo}
                        >
                            Add TODO
                        </button>
                    </>
                )}
            </div>

            <ul className="sm:w-9/12 lg:w-5/12 w-full px-4 flex flex-col items-center">
                {isLoading && <p className="text-pink-600 text-2xl italic font-medium">
                    Loading...
                </p>}

                {!isLoading && todos && todos.length == 0 ? (
                    <h1 className="text-red-600 text-2xl font-medium">No TODO In The List</h1>
                ) : (
                    <>
                        {!isLoading && todos && todos.map((todo: any) => (
                            <li
                                className="bg-slate-900 px-6 py-5 rounded-lg my-3 hover:text-green-400 text-lg w-full flex justify-between items-start"
                                key={todo._id}
                            >
                                <div className="flex justify-center items-start w-8/12">
                                    <input
                                        onChange={() => toggleTodo(todo._id, todo.completed)}
                                        className="w-5 h-5 cursor-pointer mt-1"
                                        checked={todo.completed}
                                        type="checkbox"
                                    />

                                    <span
                                        className={`${todo.completed ? "line-through font-semibold" : "list-none"} px-4 w-full`}
                                    >
                                        {todo.text}
                                    </span>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <button
                                        className="text-sky-400 uppercase md:text-base text-sm px-3 hover:text-sky-600"
                                        onClick={() => handleEdit(todo)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="text-pink-400 uppercase md:text-base text-sm hover:text-pink-600"
                                        onClick={() => deleteTodo(todo._id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </>
                )}
            </ul>
        </div>
    )
};

export default Todo;