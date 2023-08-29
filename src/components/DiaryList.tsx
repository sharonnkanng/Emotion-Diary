import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ProcessedComment } from "App";
import MyButton from "./MyButton";
import DiaryItem from "./DiaryItem";

interface Option {
    value: string;
    name: string;
}
const sortOptionList: Option[] = [
    { value: "latest", name: "Latest" },
    { value: "oldest", name: "Oldest" },
];

const filterOptionList: Option[] = [
    { value: "all", name: "All" },
    { value: "positive", name: "Positive" },
    { value: "negative", name: "Negative" },
];

interface ControlMenuProps {
    value: Option["value"];
    onChange: (value: string) => void;
    optionList: Option[];
}

interface DiaryListProps {
    diaryList: ProcessedComment[];
}

const ControlMenu: React.FC<ControlMenuProps> = ({ value, onChange, optionList }) => {
    return (
        <select className="ControlMenu" value={value} onChange={(e) => onChange(e.target.value)}>
            {optionList.map((item, idx) => (
                <option key={idx} value={item.value}>
                    {item.name}
                </option>
            ))}
        </select>
    );
};
const DiaryList: React.FC<DiaryListProps> = ({ diaryList }) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState<Option["value"]>("latest");
    const [filter, setFilter] = useState<Option["value"]>("all");

    const filterCallBack = (item: ProcessedComment) => {
        if (filter === "positive") {
            return item.emotion <= 3;
        } else {
            return item.emotion > 3;
        }
    };

    const getProcessedDiaryList = (): ProcessedComment[] => {
        const compareDate = (a: ProcessedComment, b: ProcessedComment) => {
            if (sortType === "latest") {
                return b.date - a.date;
            } else {
                return a.date - b.date;
            }
        };

        const copyList = JSON.parse(JSON.stringify(diaryList));
        const filterList =
            filter === "all" ? copyList : copyList.filter((item: ProcessedComment) => filterCallBack(item));
        const sortedList = filterList.sort(compareDate);
        return sortedList;
    };

    return (
        <div className="DiaryList">
            <div className="menu-wrapper">
                <div className="left-col">
                    <ControlMenu value={sortType} onChange={setSortType} optionList={sortOptionList} />
                    <ControlMenu value={filter} onChange={setFilter} optionList={filterOptionList} />
                </div>
                <div className="right-col">
                    <MyButton
                        type={"positive"}
                        text="Write a new diary"
                        onClick={() => {
                            navigate("/new");
                        }}
                    />
                </div>
            </div>

            {getProcessedDiaryList().map((item) => (
                <DiaryItem key={item.id} {...item} />
            ))}
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
