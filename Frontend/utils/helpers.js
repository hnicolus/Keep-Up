export const sumOf = (data, propertyName)=>{
    let total = 0;
    for (let x = 0; x < data.length; x++) {
        const donation = data[x];
        total += Number(donation[propertyName]);
    }
    return   total;
}