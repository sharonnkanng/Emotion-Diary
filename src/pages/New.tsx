import React, { useEffect } from "react";
import DiaryEditor from "components/DiaryEditor";

const New = () => {
    useEffect(() => {
        const titleElement = document.getElementsByTagName("title")[0];
        titleElement.innerText = "New diary";
    }, []);

    return (
        <div>
            <DiaryEditor />
        </div>
    );
};

export default New;
