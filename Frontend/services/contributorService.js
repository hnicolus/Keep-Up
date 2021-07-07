import {http} from './httpService';


export const getBySuburb =async (suburb) =>{
const path = `/getContributors?suburb=${suburb}`;
    try {
        
        const {data } =await http.get(path);
        return data;

    } catch (error) {
        throw new Error(error);
    }
}

export const getByMonthAndSubrub = async (month,suburb) =>{
    try {
        const result = await getBySuburb(suburb);
        return result.filter(contributor =>contributor.suburb.toLowerCase() === suburb.toLowerCase());

    } catch (error) {
        throw new Error(error.message);
    }
}

