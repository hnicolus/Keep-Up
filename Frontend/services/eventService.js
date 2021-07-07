import {http } from './httpService';

const currentDate = new Date();

export const getByMonthAndSuburb = async (month,suburb )=>{
    try {
        const results = await getBySuburb(suburb);
        return results.filter(event =>{
            const itemDate = new Date(event.date);
            return itemDate.getMonth === month && currentDate.getFullYear() === itemDate.getFullYear();
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
        const result =await getBySuburb(suburb);
        return result.filter(event =>new Date(event.date).getTime() > currentDate.getTime());
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
            return result.filter(event =>new Date(event.date).getDay < currentDate.getDay );
        }else{
            result = await getBySuburb(suburb);
            return result.filter(event => new Date(event.date).getTime() < currentDate.getTime() );
        }

    } catch (error) {
        throw new Error(error.message);
    }
}