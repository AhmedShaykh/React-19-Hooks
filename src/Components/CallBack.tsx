import React, { FC, memo } from "react";

type Props = {
    counter: number;
    setCounter: any;
};

const CallBack: FC<Props> = ({ counter, setCounter }) => {

    console.log("Render");

    return (
        <button
            className="rounded-lg border border-black bg-black py-2.5 font-medium text-white px-5 mt-12"
            onClick={setCounter}
        >
            Counter: {counter}
        </button>
    )
};

export default memo(CallBack); // If Props Update & New Add Then Memo Will Re-Render The Component