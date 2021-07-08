import {http } from './httpService';
import * as helper from "../utils/helpers";

const currentDate = new Date();

export const getByMonthAndSuburb=async (suburb,month,year = currentDate.getFullYear())=>{
    try {
        let results =await  getBySuburb(suburb);

        if(results){
        results =  results.filterByMonthAndYear(month,year);
        }

        return results;

    } catch (error) {
        throw new Error(error.message)
    }
}

export const getBySuburb = async(suburb)=>{

    const projects_url = `/getProjects?suburb=${suburb}`;
    try {
        const result =await http.get(projects_url);
        return result.data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const getUpComing = async(suburb)=>{
    try {
        const projects =await getBySuburb(suburb);
        return projects.filter(project => new Date(project.date).getTime() > currentDate.getTime());
    } catch (error) {
        throw new Error(error.message);
    }
}
export const getMonthlyExpenses =async (suburb) =>{
    try {
        const spentArr = [];
        for (let x = 0; x <= currentDate.getMonth(); x++) {
            const results = await getByMonthAndSuburb(suburb, x);
            const sum = helper.sumOf(results, 'spend');
            spentArr.push(sum);
        }

        return spentArr;

    }catch (e) {
        throw new Error(e.message)
    }
}
export const  getCompleted = async(suburb, month = null)=>{
    try {
        let results ;

        if(month != null){
            results = await getByMonthAndSuburb(suburb,month,currentDate.getFullYear());
        }else{
            results =await getBySuburb(suburb);
        }

        if( results.length > 0 ){
            return  results.filter(proj =>new Date(proj.date).getTime() < currentDate.getFullYear());
        }

        return results;
    } catch (error) {
        throw new Error(error.message);
    }   
}