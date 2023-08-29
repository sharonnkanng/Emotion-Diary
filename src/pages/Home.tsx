import React, { useState, useContext, useEffect } from "react";
import Header from "components/Header";
import MyButton from "components/MyButton";
import DiaryList from "components/DiaryList";
import { DiaryContext, ProcessedComment } from "App";

const monthNames: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const Home: React.FC = () => {
    const [curDate, setCurDate] = useState(new Date());
    const [data, setData] = useState<ProcessedComment[]>([]);
    const diaryList = useContext(DiaryContext);
    const headText = `${curDate.getFullYear()} ${monthNames[curDate.getMonth()]}`;

    useEffect(() => {
        const firstDay = new Date(curDate.getFullYear(), curDate.getMonth(), 1).getTime();
        const lastDay = new Date(curDate.getFullYear(), curDate.getMonth() + 1, 0, 23, 59, 59).getTime();
        if (diaryList) {
            setData(diaryList.data.filter((item) => item.date >= firstDay && item.date <= lastDay));
        }
    }, [diaryList, curDate]);

    const increaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() + 1));
    };
    const decreaseMonth = () => {
        setCurDate(new Date(curDate.getFullYear(), curDate.getMonth() - 1));
    };

    return (
        <div>
            <Header
                headText={headText}
                leftChild={<MyButton text="<" onClick={decreaseMonth} />}
                rightChild={<MyButton text=">" onClick={increaseMonth} />}
            />
            <DiaryList diaryList={data} />
        </div>
    );
};

export default Home;
