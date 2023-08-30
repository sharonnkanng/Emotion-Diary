import React, { useRef, useReducer, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingScreen from "pages/Landing";

import New from "pages/New";
import Diary from "pages/Diary";
import Home from "pages/Home";
import Edit from "pages/Edit";
import DiaryList from "components/DiaryList";

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
        case "INIT": {
            return action.data ? [action.data].flat() : [];
        }

        case "CREATE": {
            if (!action.data) break;
            const newItem = {
                ...action.data,
            };
            newState = [newItem, ...state];
            break;
        }
        case "DELETE": {
            newState = state.filter((it) => it.id !== action.targetID);
            break;
        }

        case "EDIT": {
            if (!action.data) break;
            newState = state.map((it) => (it.id === action.data?.id ? { ...action.data } : it));
            break;
        }
        default:
            return state;
    }

    localStorage.setItem("diary", JSON.stringify(newState));
    return newState;
};

interface DiaryContextType {
    data: ProcessedComment[];
    dispatch: React.Dispatch<DataAction>;
    onCreate: (date: number, content: string, emotion: number) => void;
    onEdit: (targetId: number, date: number, content: string, emotion: number) => void;
    onDelete: (targetId: number) => void;
}

export const DiaryContext = React.createContext<DiaryContextType | undefined>(undefined);

function App() {
    const [data, dispatch] = useReducer(diaryReducer, []);
    const [loadingComplete, setLoadingComplete] = useState(false);

    useEffect(() => {
        const localData = localStorage.getItem("diary");
        if (localData) {
            const diaryList = JSON.parse(localData).sort((a: ProcessedComment, b: ProcessedComment) => b.id - a.id);
            dataId.current = diaryList[0].id + 1;

            dispatch({ type: "INIT", data: diaryList });
        }
    }, []);

    // TODO
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

    const handleLoadingComplete = () => {
        setLoadingComplete(true);
    };

    return (
        <div className="App">
            {loadingComplete ? (
                <DiaryContext.Provider value={{ data, dispatch, onCreate, onEdit, onDelete }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/new" element={<New />} />
                            <Route path="/diary/:id" element={<Diary />} />
                            <Route path="/edit/:id" element={<Edit />} />
                        </Routes>
                    </BrowserRouter>
                </DiaryContext.Provider>
            ) : (
                <LoadingScreen onLoadingComplete={handleLoadingComplete} />
            )}
        </div>
    );
}

export default App;
