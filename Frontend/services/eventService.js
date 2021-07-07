import {http } from './httpService';
const currentDate = new Date();

export const getByMonthAndSuburb = async (month,year = currentDate.getFullYear(),suburb )=>{
    try {
        const results = await getBySuburb(suburb);
        return results.filter(event => {
            const itemDate = new Date(event.date);
            return itemDate.getMonth === month &&  itemDate.getFullYear() === year;
        })
    } catch (error) {
        throw new Error(error.message);
    }   
}

export const getBySuburb = async (suburb)=>{
    const path = `getEvents?suburb=${suburb}`;
    try {   
            const {data } =await http.get(path);
            return data;

    } catch (error) {
        
        throw new Error(error.message);
    }
}

export const getUpcoming =async (suburb)=>{
    try {
        let  result ;
        result = await getBySuburb(suburb);

        if(result.length >  0 ){
            result = result.filter(event =>new Date(event.date).getTime() > currentDate.getTime());
        }
        return result;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getCompleted = async(suburb, month = null) =>{
    try {
        let result ;
        if(month != null)
        {
            result = await getByMonthAndSuburb(month,suburb);

            if(result.length > 0 ){
                result =  result.filter(event =>new Date(event.date).getDay < currentDate.getDay );
            }
            return  result ;
        }
        result = await getBySuburb(suburb);

        if(result.length > 0 ){
            return result.filter(event => new Date(event.date).getTime() < currentDate.getTime());
        }
        return  result;

    } catch (error) {
        throw new Error(error.message);
    }
}