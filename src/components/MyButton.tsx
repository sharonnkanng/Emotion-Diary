import React, { FC, MouseEventHandler } from 'react';

type btnType = "default"| "positive"| "negative";

interface MyButtonProps {
    text: string;
    type?: btnType;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}

const MyButton: FC<MyButtonProps> = ({ text, type='default', onClick }) => {

    return (
        <button className={["MyButton", `MyButton_${type}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    );
};

MyButton.defaultProps = {
    type: "default",
};

export default MyButton;
