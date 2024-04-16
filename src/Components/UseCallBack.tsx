"use client";
import React, { useCallback, useState } from "react";
import CallBack from "./CallBack";

const UseCallBack = () => {

    const [count, setCount] = useState<number>(0);

    const [counter, setCounter] = useState<number>(0);

    const ChangeCounter = useCallback(() => {

        return setCounter(counter + 1);

    }, [counter]); // UseCallBack Hook Protect Re-Rendering Function

    return (
        <div className="flex justify-center flex-col items-center">
            <CallBack
                counter={counter}
                setCounter={ChangeCounter} // If Call The Function Then Call It
            />

            <button
                className="rounded-lg border border-black bg-black py-2.5 font-medium text-white px-5 mt-12"
                onClick={() => setCount(count => count + 1)}
            >
                Count: {count}
            </button>
        </div>
    )
};

export default UseCallBack;