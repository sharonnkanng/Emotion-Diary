import React, { FC }  from "react";

interface HeaderProps {
    headText: string;
    leftChild?: React.ReactNode;
    rightChild?: React.ReactNode;
}

const Header: FC<HeaderProps>  = ({headText, leftChild, rightChild}) => {
    return (<header>
<div className="head_btn_left">
    {leftChild}
</div>
<div className="head_text">
    {headText}
</div>
<div className="head_btn_right">
    {rightChild}
</div>
</header>
)
};
export default Header;