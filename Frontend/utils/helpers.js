export const sumOf = (data, propertyName)=>{
    let total = 0;
    for (let x = 0; x < data.length; x++) {
        const donation = data[x];
        total += Number(donation[propertyName]);
    }
    return   total;
}

Array.prototype.filterByMonthAndYear = function (month,year,datePropertyName = 'date') {
    let input = this;
    return input.filter(item => {
        const date = new Date(item[datePropertyName]);
        return date.getMonth() === month && date.getFullYear() === year;
    });
}