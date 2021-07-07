import {http} from './httpService';

const currentDate =new Date();
export const getBySuburb =async (suburb) =>{
const path = `/getContributors?suburb=${suburb}`;
    try {
        
        const {data } =await http.get(path);
        return data;

    } catch (error) {
        throw new Error(error);
    }
}

export const getByMonthAndSubrub = async (month,year = currentDate.getFullYear(),suburb) =>{
    try {
        let result ;
         result = await getBySuburb(suburb);

         return  result.filter(contributor =>{
            const regDate= new Date(contributor.date);
            return  regDate.getMonth() === month && regDate.getFullYear() === year;
        });

    } catch (error) {
        throw new Error(error.message);
    }
}

