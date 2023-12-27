const defaultOptions = {
    getCreator: false,
    getID: false,
    get_id: false,
    get__v: false,
    getDay: true,
    getMonth: true,
    getYear: true,
    getName: true,
    getPrice: true,
    getQuantity: true,
}

export const groupBy = (arr, key) =>
    arr.reduce((acc, obj) => {
        const groupKey = obj[key];
        acc[groupKey] = acc[groupKey] || [];
        let newObj = { ...obj }
        delete newObj[key]
        acc[groupKey].push(newObj);
        return acc;
    }, {});

export const minifyData = (data, options = {}) => {
    options = { ...defaultOptions, ...options }

    data = data.map(item => {
        let newItem = { ...item }

        !options.getCreator && delete newItem.creator
        !options.get_id && delete newItem._id
        !options.get__v && delete newItem.__v
        !options.getID && delete newItem.itemID
        !options.getDay && delete newItem.day
        !options.getMonth && delete newItem.month
        !options.getYear && delete newItem.year
        !options.getName && delete newItem.itemName
        !options.getPrice && delete newItem.itemPrice
        !options.getQuantity && delete newItem.itemQuantity

        return newItem
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