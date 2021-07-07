import {http} from './httpService';


export const getAll = async () => {
    try {
    const { data } =  await http.get(`/getDonations`);
    return data;
    } catch (error) {
    throw new Error(error.message);
    }
}

export const getAllByMonthAndSuburb = async (suburb, month, year =null)=>{
try {
    if(year === null) year = new Date().getFullYear();

    let results = await getAllBySuburb(suburb);
    if( results.length > 0 ){
        results = results.filterByMonthAndYear(month,year);
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

