import {http } from './httpService';


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
        return projects.filter(project => new Date(project.transactionDate).getTime() > currentDate.getTime());
    } catch (error) {
        throw new Error(error.message);
    }
}

export const  getCompleted = async(suburb, month = null)=>{
    try {
        let results ;

        if(month != null){
            results = await getByMonthAndSuburb(suburb,month) ;
            if( results.length > 0 ){
                results = results.filter(event => new Date(event.date).getMonth() === month);
            }
        }else{
            results =await getBySuburb(suburb);
        }

        if( results.length > 0 ){
            return results.filter(project =>{
            const projectDate = new Date(project.transactionDate);
            return projectDate.getTime() < currentDate.getTime() && projectDate.getFullYear() === currentDate.getFullYear(); 
        });
    }

        return results;
    } catch (error) {
        throw new Error(error.message);
    }   
}