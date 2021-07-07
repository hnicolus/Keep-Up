import React, {useState, useEffect} from "react";

import {Container, Grid} from "@material-ui/core";
import * as projectService from "../../../services/projectsService";
import  * as donationService from '../../../services/donationsService';
import * as contributorService from '../../../services/contributorService';
import * as eventService from '../../../services/eventService';
import * as helper from '../../../utils/helpers';
import MiniCard from "./MiniCard";
import SuburbSelector from "./SuburbSelector";

const currentMonth = new Date().getMonth();

function Statistics() {

    const [statsCardsData, setStatsCardsData] = useState([]);
    const [suburb,setSuburb] = useState('sandown')

    useEffect(()=>{
        (async ()=>{
            const data = [];

            const upComingEvents = await eventService.getUpcoming(suburb);
            data.push({
                label:'Up Coming Events',
                data: upComingEvents.length,
                icon:'fas fa-calendar-alt'
            });

            const completedEvents = await eventService.getCompleted(suburb,currentMonth);
            data.push({
                label:'Current Month Completed Events',
                data: completedEvents.length,
                icon:'far fa-calendar-check'
            });

            const projects =await projectService.getByMonthAndSuburb(currentMonth,suburb);
            data.push({
                label:'Current Month Total Spent',
                data: `R ${helper.sumOf(projects,'spend')}`,
                icon:'fas fa-money-bill-wave'
            });

            const currentMonthCompletedProject = await projectService.getCompleted(suburb,currentMonth);
            data.push({
                label:'Current Completed Projects',
                data: currentMonthCompletedProject.length,
                icon:'far fa-calendar-check'
                });

            const upcomingProjects =  await projectService.getUpComing(suburb);
            data.push({
                label:'Up Coming Projects',
                data: upcomingProjects.length,
                icon:'fas fa-calendar-alt'
            });

            const donations = await donationService.getByMonthAndSuburb(currentMonth,suburb);
            data.push({
                label:'Current Month Total Donation',
                data: `R ${helper.sumOf(donations,'amount')}`,
                icon:'fas fa-money-bill-alt'
            });

            //Todo Contributor should have a contribution Date in order to be filtered
            const contributors = await contributorService.getBySuburb(suburb);
            setStatsCardsData(data);
        })()
      },[suburb])

    return (
        <div>
            <Container>
                <SuburbSelector onSuburbChange={suburb=>setSuburb(suburb)}/>
                <Grid container spacing={2}>
                  {statsCardsData.map((statsData,index) =>(
                      <Grid key={index} item xs={12} sm={4} md={3}>
                        <MiniCard  label={statsData.label}
                                   data={statsData.data}
                                   icon={statsData.icon} />
                      </Grid>
                  ))}
                </Grid>
            </Container>
        </div>
    );
}

export default Statistics;