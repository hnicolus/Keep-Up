import {http} from './httpService';
import * as helper from "../utils/helpers";


const currentMonth = new Date().getMonth();
export const getAll = async () => {
    try {
    const { data } =  await http.get(`/getDonations`);
    return data;
    } catch (error) {
    throw new Error(error.message);
    }
}

export  const getMonthlyDonations =async (suburb) =>{
    try {
        const moneyRecivedArr = [];
        for (let x = 0; x <= currentMonth; x++) {
            const results = await getAllByMonthAndSuburb(suburb, x);
            const sum = helper.sumOf(results, 'amount');
            moneyRecivedArr.push(sum);
        }
        return moneyRecivedArr;

    }catch (e) {

        throw  new Error(e.message);
    }
}
export const getAllByMonthAndSuburb = async (suburb, month, year =null)=>{
try {
    if(year === null) year = new Date().getFullYear();

    let results = await getAllBySuburb(suburb);
    if( results.length > 0 ){
        results = results.filterByMonthAndYear(month,year,'transactionDate');
    }

    return results;
} catch (error) {
    throw new Error(error.message)
}
}


export const getAllBySuburb =async (suburb)=>{
    try {
        let result =  await getAll();

        if( result.length > 0 )
        {
           result =  result.filter(donation => donation.reference.toLowerCase() === suburb.toLowerCase());
        }
        return result;

    } catch (error) {

        throw new Error(error.message); 
    }
}

