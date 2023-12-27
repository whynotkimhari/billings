

export const LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
export const MONTHS = [
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

export const checkMONTHS = (months) => {
    const condA = months.filter(m => m.total !== 0).length !== 0
    const condB = months.filter(m => m.shopping_date.length !== 0).length !== 0
    return condA && condB
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const getFakeData = () => {
    return [
        MONTHS.map(() =>
            getRandomInt(0, 20)
        ),
        MONTHS.map(() =>
            getRandomInt(0, 50000)
        )
    ]
}