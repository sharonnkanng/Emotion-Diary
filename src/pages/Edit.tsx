import { useNavigate, useParams } from "react-router";
import React, { useContext, useEffect, useState } from "react";
import { DiaryContext, ProcessedComment } from "App";
import DiaryEditor from "components/DiaryEditor";

const Edit: React.FC = () => {
    const navigate = useNavigate();
    const [originData, setOriginData] = useState<ProcessedComment | undefined>();
    const { id } = useParams<{ id: string }>();
    const diaryList = useContext(DiaryContext);

    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerText = `Emotion Diary - Edit ${id}`;
    }, []);

    useEffect(() => {
        if (diaryList) {
            const targetDiary = diaryList.data.find((it) => it.id === Number(id));
            if (targetDiary) {
                setOriginData(targetDiary);
            } else {
                navigate("/", { replace: true });
            }
        }
    }, [diaryList, id]);
    return <div className="EditPage">{originData && <DiaryEditor isEdit={true} originData={originData} />}</div>;
};

export default Edit;
