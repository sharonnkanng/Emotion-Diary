import React from "react";

interface EmotionItemProps {
    emotion_id: number;
    emotion_img: string;
    emotion_des: string;
    onClick: (emotion_id: number) => void;
    isSelected: boolean;
}

const EmotionItem: React.FC<EmotionItemProps> = ({ emotion_id, emotion_img, emotion_des, onClick, isSelected }) => {
    return (
        <div
            onClick={() => onClick(emotion_id)}
            className={["EmotionItem", isSelected ? `EmotionItem_on_${emotion_id}` : `EmotionItem_off`].join(" ")}
        >
            <img src={emotion_img} />
            <span>{emotion_des}</span>
        </div>
    );
};

export default React.memo(EmotionItem);
