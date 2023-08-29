import React from "react";
import { useNavigate } from "react-router";
import MyButton from "./MyButton";

const DiaryItem: React.FC<{ id: number; emotion: number; content: string; date: number }> = ({
    id,
    emotion,
    content,
    date,
}) => {
    const navigate = useNavigate();
    const goDetail = () => {
        navigate(`/diary/${id}`);
    };
    const goEdit = () => {
        navigate(`/edit/${id}`);
    };
    return (
        <div className="DiaryItem" key={id}>
            <div onClick={goDetail} className={["emotion-img-wrapper", `emotion-img-wrapper-${emotion}`].join(" ")}>
                <img src={`${process.env.PUBLIC_URL}/assets/emotion${emotion}.png`} />
            </div>
            <div onClick={goDetail} className="info-wrapper">
                <div className="diary-date">{new Date(date).toLocaleDateString()}</div>
                <div className="diary-content-preview">{content.slice(0, 25)}</div>
            </div>
            <div onClick={goEdit} className="btn-wrapper">
                <MyButton text="Edit" />
            </div>
        </div>
    );
};

export default DiaryItem;
