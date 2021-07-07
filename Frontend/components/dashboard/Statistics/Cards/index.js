import React, {useEffect, useState} from "react";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import MiniCard from "./MiniCard";

import * as eventService from "../../../../services/eventService";
import * as helper from "../../../../utils/helpers";
import * as projectService from "../../../../services/projectsService";
import * as donationService from "../../../../services/donationsService";
import * as contributorService from "../../../../services/contributorService";
import {Skeleton} from "@material-ui/lab";

const displaySkeletons=()=>{
    const skeletons = [1,2,3,4,5,6,7,8];
    return(
        <Grid container spacing={2}>
            {skeletons.map((skeletons,index) =>(
                <Grid key={index} item xs={12} sm={6} md={3}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={2} alignItems='center' justify='center'>
                                <Grid item sm={3}>
                                    <Typography align='center'>
                                        <Skeleton variant="circle" width={40} height={40} />
                                    </Typography>
                                </Grid>
                                <Grid item sm={9}>
                                    <Typography variant='h5' align='center'  style={{fontWeight:'bold'}}><Skeleton/>
                                    </Typography>
                                    <Typography align='center'><Skeleton/></Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    )
}
const Cards = ({suburb})=>{

    const currentMonth = new Date().getMonth();
    const [statsCardsData, setStatsCardsData] = useState([]);

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
                    data: `R ${helper.sumOf(await projectService.getByMonthAndSuburb(suburb,currentMonth),'spend').toFixed(2)}`,
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
                    data: `R ${helper.sumOf(await donationService.getAllByMonthAndSuburb(suburb,currentMonth),'amount').toFixed(2)}`,
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
    },[suburb]);

    if(statsCardsData.length === 0) return (displaySkeletons());

    return(
        <Grid container spacing={2}>
            {statsCardsData.map((statsData,index) =>(
                <Grid key={index} item xs={12} sm={6} md={3}>
                    <MiniCard  label={statsData.label}
                               data={statsData.data}
                               icon={statsData.icon} />
                </Grid>
            ))}
        </Grid>
    )
}
export default  Cards;

