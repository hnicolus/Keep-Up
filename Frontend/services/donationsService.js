import {http} from './httpService';
const currentDate =new Date();

export const getAll = async () => {
    try {
    const { data } =  await http.get(`/getDonations`);
    return data;
    } catch (error) {
    throw new Error(error.message);
    }
}
export const getByMonthAndSuburb = async (month,year = currentDate.getFullYear(),suburb)=>{
try {
    const results = await getBySuburb(suburb);
    return results.filter(donation =>{
        const date = new Date(donation.transactionDate);
        return  date.getMonth() === month && date.getFullYear() === year;
    });

} catch (error) {
    throw new Error(error.message)
}
}


export const getBySuburb =async (suburb)=>{
    try {
        const result =  await getAll();
        return result.filter(donation => donation.reference.toLowerCase() === suburb.toLowerCase());

    } catch (error) {

        throw new Error(error.message); 
    }
}

