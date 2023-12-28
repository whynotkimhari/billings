const labels = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getFakeData = (months) => {
    return [
        months.map(() =>
            getRandomInt(0, 20)
        ),
        months.map(() =>
            getRandomInt(0, 50000)
        )
    ]
}

const getInitMonths = () => {
    return [
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
        {
            shopping_date: [],
            total: 0,
        },
    ]
}

export const checkMONTHS = (months) =>
    months.filter(m => m.total !== 0).length && months.filter(m => m.shopping_date.length !== 0).length

export const getOptions = (text = "") => {
    return {
        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text,
            },
        },
        scales: {
            "bar-y-axis": {
                type: "linear",
                position: "left",
            },
            "line-y-axis": {
                type: "linear",
                position: "right",
                ticks: {
                    stepSize: 1,
                },
            },
        },
    }
}

export const getDataForChart = (months, checkMonth, id) => {
    const dataset1 = months.map((m) => m.shopping_date.length);
    const dataset2 = months.map((m) => m.total);
    const [fakeDataset1, fakeDataset2] = getFakeData(labels);
    return {
        labels,
        datasets: [
            {
                label: "Shopping times",
                data: checkMonth ? dataset1 : !id ? fakeDataset1 : [],
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "line-y-axis",
                type: "line",
            },
            {
                label: "Total spending (HUF)",
                data: checkMonth ? dataset2 : !id ? fakeDataset2 : [],
                borderColor: "rgb(53, 162, 235)",
                backgroundColor: "rgba(53, 162, 235, 0.5)",
                yAxisID: "bar-y-axis",
                type: "bar",
            },
        ],
    }
}

export const getMonths = (data) => {
    const MONTHS = getInitMonths();

    data.forEach((item) => {
        MONTHS[item.month - 1].shopping_date.indexOf(item.day) === -1 &&
            MONTHS[item.month - 1].shopping_date.push(item.day);
        MONTHS[item.month - 1].total += item.itemPrice * item.itemQuantity;
    });

    return MONTHS
}