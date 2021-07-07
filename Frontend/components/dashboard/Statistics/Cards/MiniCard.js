import React from "react";
import { loadCSS } from 'fg-loadcss';
import {Card, CardContent, Typography,Grid} from "@material-ui/core";
import Icon from '@material-ui/core/Icon';

const MiniCard =({label,data,icon})=>{

    React.useEffect(() => {
        //lazy load font awesome css
        const node = loadCSS(
            'https://use.fontawesome.com/releases/v5.12.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
        return () => {
            node.parentNode.removeChild(node);
        };
    }, []);
    return(
        <Card>
            <CardContent>
                <Grid container spacing={2} alignItems='center' justify='center'>
                    <Grid item sm={3}>
                        <Typography align='center'>
                            <Icon fontSize='large' className={icon} color="primary"/>
                        </Typography>
                    </Grid>
                    <Grid item sm={9}>
                        <Typography align='center' style={{fontWeight:'bold'}}>{label}</Typography>
                        <Typography align='center'>{data}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}
export  default  MiniCard;