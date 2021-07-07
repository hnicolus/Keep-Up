import React from "react";
import { Bar } from 'react-chartjs-2';
import {Card, CardContent, Typography} from "@material-ui/core";

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
const MoneyChart = ({months,moneyRecieved,moneySpent, moneySpentColor,moneyReceivedColor}) =>{
    const data = {
        labels: months,

        datasets: [
            {
                label: '# Money Recieved',
                data:[...moneyRecieved],
                backgroundColor: moneyReceivedColor,
            },
            {
                label: '# Money Spent',
                data:  [...moneySpent],
                backgroundColor: moneySpentColor,
            }
        ],
    };
    return (
        <Card>
            <CardContent>
                <div className='header'>
                    <Typography variant='h6'>Money received and Money spent</Typography>
                </div>
                <Bar  data={data} options={options} />
            </CardContent>
        </Card>
    );
}
export default MoneyChart;