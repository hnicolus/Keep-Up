import React from "react";
import { Pie } from 'react-chartjs-2';
import {Card, CardContent, Typography} from "@material-ui/core";
import {sumOf} from "../../../utils/helpers";
const options = {
    scales: {
        yAxes: [
            {
                ticks: {
                    beginAtZero: true,
                },
            },
        ],
    },
};
const MoneyPieChart = ({moneyRecieved,moneySpent}) =>{
    const data = {
        labels: ['Recieved (R)', 'Spent (R)'],

        datasets: [
            {
                label: '# Money',
                data:[sumOf(moneyRecieved),sumOf(moneySpent)],
                backgroundColor: [
                    'rgb(194, 194, 194)',
                    'rgb(54, 162, 235)'
                ],
            }
        ],
    };
    return (
        <Card>
            <CardContent>
                <div className='header'>
                    <Typography variant='h6'>Money Total</Typography>
                </div>
                <Pie data={data} options={options} />
            </CardContent>
        </Card>
    );
}
export default MoneyPieChart;