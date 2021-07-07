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
    const [suburb,setSuburb] = useState('sandown');

    useEffect(()=>{
        (async ()=>{
            const data = [
                {
                    label:'Up Coming Events',
                    data: (await eventService.getAllUpComing(suburb)).length,
                    icon:'fas fa-calendar-alt'
                },
                {
                    label:'Current Month Completed Events',
                    data: (await eventService.getCompleted(suburb,currentMonth)).length,
                    icon:'far fa-calendar-check'
                },
                {
                    label:'Current Month Total Spent',
                    data: `R ${helper.sumOf(await projectService.getByMonthAndSuburb(suburb,currentMonth),'spend')}`,
                    icon:'fas fa-money-bill-wave'
                },
                {
                    label:'Current Completed Projects',
                    data: (await projectService.getCompleted(suburb,currentMonth)).length,
                    icon:'far fa-calendar-check'
                },
                {
                    label:'Up Coming Projects',
                    data: ( await projectService.getUpComing(suburb)).length,
                    icon:'fas fa-calendar-alt'
                },
                {
                    label:'Current Month Total Donation',
                    data: `R ${helper.sumOf(await donationService.getAllByMonthAndSuburb(suburb,currentMonth),'amount')}`,
                    icon:'fas fa-money-bill-alt'
                },
                {
                    label:'New Registered Contributors',
                    data: ` ${(await contributorService.getAllByMonthAndSuburb(suburb,currentMonth)).length}`,
                    icon:'fas fa-user-friends'
                }
            ];
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