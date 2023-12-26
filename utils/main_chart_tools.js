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