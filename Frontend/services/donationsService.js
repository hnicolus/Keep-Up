import {http} from './httpService';

export const getAll = async () => {
    try {
    const { data } =  await http.get(`/getDonations`);
    return data;
    } catch (error) {
    throw new Error(error.message);
    }
}
export const getByMonthAndSuburb = async (month,suburb)=>{
try {
    const results = await getBySuburb(suburb);
    return results.filter(donation =>new Date(donation.transactionDate).getMonth() === month);

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

