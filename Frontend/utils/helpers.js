export const sumOf = (data, propertyName)=>{
    let total = 0;
    for (let x = 0; x < data.length; x++) {
        const donation = data[x];
        total += Number(donation[propertyName]);
    }
    return   total;
}

Array.prototype.filterByMonthAndYear = function (month,year) {
    let input = this;
    return input.filter(donation => {
        const date = new Date(donation.transactionDate);
        return date.getMonth() === month && date.getFullYear() === year;
    });
}