export const mockData = () => {
    const data = [];
    for (let i = 1; i <= 100; i++) {
        data.push({
            id: i,
            post_id: 1,
            title: `Tại sao BOM lại quan trọng trong quản lý sản xuất ${i}`,
            tag: "Quản lý sản xuất",
            date: "2022-11-17",
            time_to_read: "10m"
        });
    }

    return data;
}