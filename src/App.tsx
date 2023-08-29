import React, { useRef, useReducer } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import New from "pages/New";
import Diary from "pages/Diary";
import Home from "pages/Home";
import Edit from "pages/Edit";

interface DataAction {
    type: string;
    data?: ProcessedComment;
    targetID?: number;
}
export interface ProcessedComment {
    content: string;
    emotion: number;
    date: number;
    id: number;
}

const diaryReducer = (state: ProcessedComment[], action: DataAction): ProcessedComment[] => {
    let newState: ProcessedComment[] = [];

    switch (action.type) {
        case "INIT":
            return action.data ? [action.data] : [];
        case "CREATE": {
            if (!action.data) break;
            const newItem = {
                ...action.data,
            };
            newState = [newItem, ...state];
            break;
        }
        case "DELETE":
            newState = state.filter((it) => it.id !== action.targetID);
            break;

        case "EDIT":
            if (!action.data) break;
            newState = state.map((it) => (it.id === action.data?.id ? { ...action.data } : it));
            break;

        default:
            return state;
    }
    return newState;
};

interface DiaryContextType {
    data: ProcessedComment[];
    dispatch: React.Dispatch<DataAction>;
    onCreate: (date: number, content: string, emotion: number) => void;
    onEdit: (targetId: number, date: number, content: string, emotion: number) => void;
}

export const DiaryContext = React.createContext<DiaryContextType | undefined>(undefined);

const dummyData: ProcessedComment[] = [
    {
        id: 1,
        date: 1692863595111,
        emotion: 1,
        content: "I'm happy 1",
    },
    {
        id: 2,
        date: 1692863595112,
        emotion: 2,
        content: "I'm happy 2",
    },
    {
        id: 3,
        date: 1692863595113,
        emotion: 3,
        content: "I'm happy 3",
    },
    {
        id: 4,
        date: 1692863595114,
        emotion: 4,
        content: "I'm happy 4",
    },
    {
        id: 5,
        date: 1692863595115,
        emotion: 5,
        content: "I'm happy 5",
    },
];
function App() {
    const [data, dispatch] = useReducer(diaryReducer, dummyData);
    const dataId = useRef(0);

    const onCreate = (date: number, content: string, emotion: number) => {
        dispatch({
            type: "CREATE",
            data: {
                id: dataId.current,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
        dataId.current += 1;
    };

    const onDelete = (targetId: number) => {
        dispatch({
            type: "DELETE",
            targetID: targetId,
        });
    };
    const onEdit = (targetId: number, date: number, content: string, emotion: number) => {
        dispatch({
            type: "EDIT",
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotion,
            },
        });
    };
    return (
        <div className="App">
            <DiaryContext.Provider value={{ data, dispatch, onCreate, onEdit }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/new" element={<New />} />
                        <Route path="/diary/:id" element={<Diary />} />
                        <Route path="/edit/:id" element={<Edit />} />
                    </Routes>
                </BrowserRouter>
            </DiaryContext.Provider>
        </div>
    );
}

export default App;
