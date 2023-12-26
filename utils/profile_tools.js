const groupBy = (arr, key) =>
    arr.reduce((acc, obj) => {
        const groupKey = obj[key];
        acc[groupKey] = acc[groupKey] || [];
        let newObj = {...obj}
        delete newObj[key]
        acc[groupKey].push(newObj);
        return acc;
    }, {});

export const minifyData = (data) => {
    data = data.map(item => {
        return {
            day: item.day,
            month: item.month,
            year: item.year,
            itemName: item.itemName,
            // itemID: item.itemID,
            itemPrice: item.itemPrice,
            itemQuantity: item.itemQuantity,
        }
    })

    return data
}

export const groupData = (data) => {
    data = groupBy(data, "year")

    for (const year in data) {
        data[year] = groupBy(data[year], "month");

        for (const month in data[year])
            data[year][month] = groupBy(data[year][month], "day");

    }
    return data
}