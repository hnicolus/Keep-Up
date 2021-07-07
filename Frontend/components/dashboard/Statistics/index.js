import React, {useState, useEffect} from "react";

import {Container, Grid} from "@material-ui/core";
import * as projectService from "../../../services/projectsService";
import  * as donationService from '../../../services/donationsService';
import * as contributorService from '../../../services/contributorService';
import * as eventService from '../../../services/eventService';
import * as helper from '../../../utils/helpers';

import MiniCard from "./MiniCard";
import SuburbSelector from "./SuburbSelector";
import MoneyChart from "./MoneyChart";
import MoneyPieChart from "./MoneyPieChart";

const currentMonth = new Date().getMonth();
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
const moneyReceivedColor ='rgb(194, 194, 194)';
const moneySpentColor = 'rgb(54, 162, 235)'
function Statistics() {

    const [statsCardsData, setStatsCardsData] = useState([]);
    const [suburb,setSuburb] = useState('sandown');
    const [moneySpent,setMoneySpent] = useState([]);
    const [moneyRecieved,setMoneyRecieved] = useState([]);

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
    useEffect(()=>{
        (async ()=>{

            const spentArr = [];
            for (let x = 0; x <= currentMonth; x++) {
                const results = await projectService.getByMonthAndSuburb('sandown', x);
                const sum = helper.sumOf(results, 'spend');
                spentArr.push(sum);
            }
            setMoneySpent(spentArr);

            const moneyRecivedArr = [];
            for (let x = 0; x <= currentMonth; x++) {
                const results = await donationService.getAllByMonthAndSuburb('sandown', x);
                const sum = helper.sumOf(results, 'amount');
                moneyRecivedArr.push(sum);
            }
            setMoneyRecieved(moneyRecivedArr)
        })();
    },[]);

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
                    <Grid item xm={12} xs={12} md={8}>
                        <MoneyChart months={months} moneyRecieved={moneyRecieved}
                                    moneyReceivedColor={moneyReceivedColor}
                                    moneySpentColor={moneySpentColor}
                                    moneySpent={moneySpent}/>
                    </Grid>
                    <Grid item xm={12} xs={12} md={4}>
                        <MoneyPieChart months={months}
                                       moneyRecieved={moneyRecieved}
                                       moneySpent={moneySpent}
                                       moneyReceivedColor={moneyReceivedColor}
                                       moneySpentColor={moneySpentColor}/>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Statistics;