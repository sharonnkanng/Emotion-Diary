import Header from "./Header";
import MyButton from "./MyButton";
import { useNavigate } from "react-router";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import EmotionItem from "./EmotionItem";
import { DiaryContext, ProcessedComment } from "App";
import { getStringDate } from "util/date";
import { emotionList } from "util/emotion";

interface DiaryEditorProps {
    isEdit?: boolean;
    originData?: ProcessedComment;
}

const DiaryEditor: React.FC<DiaryEditorProps> = ({ isEdit, originData }) => {
    const navigate = useNavigate();
    const contentRef = useRef<HTMLTextAreaElement>(null);
    const [emotion, setEmotion] = useState<number>(3);
    const [date, setDate] = useState<string>(getStringDate(new Date()));
    const [content, setContent] = useState<string>("");

    const handleClickEmotion = useCallback((emotion: number) => {
        setEmotion(emotion);
    }, []);

    const { onCreate, onEdit, onDelete } = useContext(DiaryContext) || {};

    const handleSubmit = () => {
        if (content.length < 1) {
            contentRef.current?.focus();
            return;
        }
        if (window.confirm(isEdit ? "Are you sure to edit this diary?" : "Are you sure to create this diary?")) {
            if (isEdit && originData && onEdit) {
                onEdit(originData.id, new Date(date).getTime(), content, emotion);
            } else if (!isEdit && onCreate) {
                onCreate(new Date(date).getTime(), content, emotion);
            }
        }

        navigate("/", { replace: true });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure to delete this diary?")) {
            if (originData && isEdit && onDelete) {
                onDelete(originData.id);
                navigate("/", { replace: true });
            }
        }
    };

    useEffect(() => {
        if (isEdit && originData) {
            setEmotion(originData.emotion);
            setDate(getStringDate(new Date(originData.date)));
            setContent(originData.content);
        }
    }, [isEdit, originData]);
    return (
        <div className="DiaryEditor ">
            <Header
                headText={isEdit ? "Edit your diary" : "Write a new diary"}
                leftChild={<MyButton text="Previous" onClick={() => navigate(-1)} />}
                rightChild={isEdit && <MyButton text={"Delete"} type={"negative"} onClick={handleDelete} />}
            />
            <div>
                <section>
                    <h4>What&apos;s the date?</h4>
                    <div className="input-box">
                        <input
                            className="input-date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>Today&apos;s emotion</h4>
                    <div className="input-box emotion-list-wrapper">
                        {emotionList.map((it) => (
                            <EmotionItem
                                key={it.emotion_id}
                                {...it}
                                onClick={handleClickEmotion}
                                isSelected={it.emotion_id === emotion}
                            />
                        ))}
                    </div>
                </section>
                <section>
                    <h4>Today&apos;s Diary</h4>
                    <div className="input-text-wrapper">
                        <textarea
                            placeholder={"How was your day?"}
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <div className="control-box">
                        <MyButton text="Cancel" onClick={() => navigate(-1)} />
                        <MyButton text="Save" type={"positive"} onClick={handleSubmit} />
                    </div>
                </section>
            </div>
        </div>
    );
};

export default DiaryEditor;
