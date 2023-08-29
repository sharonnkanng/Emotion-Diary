import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { DiaryContext, ProcessedComment } from "App";
import { getStringDate } from "util/date";
import Header from "components/Header";
import MyButton from "components/MyButton";
import { emotionList } from "util/emotion";

const Diary = () => {
    const { id } = useParams<{ id: string }>();
    const diaryList = useContext(DiaryContext);
    const navigate = useNavigate();
    const [data, setData] = useState<ProcessedComment | undefined>();

    useEffect(() => {
        if (diaryList) {
            const targetDiary = diaryList.data.find((it) => it.id === Number(id));

            if (targetDiary) {
                setData(targetDiary);
            } else {
                alert("No such diary exists!");
                navigate("/", { replace: true });
            }
        }
    }, [diaryList, id]);

    if (!data) {
        return <div className="DiaryPage">Loading...</div>;
    } else {
        const currentImotionData = emotionList.find((it) => it.emotion_id === data.emotion);

        return (
            <div className="DiaryPage">
                <Header
                    headText={`Memory from ${getStringDate(new Date(data.date))}`}
                    leftChild={<MyButton text={"< Previous"} onClick={() => navigate(-1)} />}
                    rightChild={<MyButton text={"Edit"} onClick={() => navigate(`/edit/${data.id}`)} />}
                />
                <article>
                    <section>
                        <h4> Today&apos;s Emotion </h4>
                        <div
                            className={[
                                "diary-img-wrapper",
                                `diary-img-wrapper-${currentImotionData?.emotion_id}`,
                            ].join(" ")}
                        >
                            <img src={currentImotionData?.emotion_img} />
                            <div className="emoiton-description">{currentImotionData?.emotion_des}</div>
                        </div>
                    </section>
                    <section>
                        <h4>Today&apos;s Diary</h4>
                        <div className="diary-content-wrapper">
                            <p>{data.content}</p>
                        </div>
                    </section>
                </article>
            </div>
        );
    }
};

export default Diary;
