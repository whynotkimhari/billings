import { dictionary, language } from "./global"

const processingData = (data, month) => {
    let labels = []
    let dataset = []
    
    Object.keys(data).map(day => {
        labels.push(`${day}/${month}`)
        const sum = data[day].reduce((total, item) => total + item.itemPrice * item.itemQuantity, 0)
        dataset.push(sum)


    })
    return { labels, dataset }
}

export const getDataForChart = (data, month, year) => {
    const { labels, dataset } = processingData(data, month)
    return {
        labels,
        datasets: [
            {
                label: dictionary[language].monthview_title(month, year),
                data: dataset,
                borderColor: "rgb(255, 99, 132)",
                backgroundColor: "rgba(255, 99, 132, 0.5)",
                yAxisID: "line-y-axis",
                type: "line",
            },
        ],
    }
}