export const toStr = (month) => {
    switch (month) {
        case 1 || '1':
            return 'January'
        case 2 || '2':
            return 'February'
        case 3 || '3':
            return 'March'
        case 4 || '4':
            return 'April'
        case 5 || '5':
            return 'May'
        case 6 || '6':
            return 'June'
        case 7 || '7':
            return 'July'
        case 8 || '8':
            return 'August'
        case 9 || '9':
            return 'September'
        case 10 || '10':
            return 'October'
        case 11 || '11':
            return 'November'
        case 12 || '12':
            return 'December'
        default:
            return 'Unknown'
    }
}