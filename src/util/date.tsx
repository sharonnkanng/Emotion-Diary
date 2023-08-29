export const getStringDate = (date: Date) => {
    const year = date.getFullYear();
    let month: string | number = date.getMonth() + 1;
    let day: string | number = date.getDate();

    if (month < 10) {
        month = `0${month}`;
    }

    if (day < 10) {
        day = Number(`0${day}`);
    }

    return `${year}-${month}-${day}`;
};
