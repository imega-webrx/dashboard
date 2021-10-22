import * as React from 'react'
import {Breadcrumbs, Grid, Typography} from "@mui/material";

export default function DrugEditor(props){
    const breadcrumbs = [
        <Typography color={"text.primary"} key={1}>
            {props.category}
        </Typography>,
        <Typography color={"text.primary"} key={2}>
            {props.drug}
        </Typography>
    ]
    return(
        <Grid sx={{paddingLeft: "10px"}}>
            <Grid>
                <Breadcrumbs separator="›">
                    {breadcrumbs}
                </Breadcrumbs>
            </Grid>
            <Grid>
                <Typography variant={"h1"}>
                    {props.drug}
                </Typography>
            </Grid>
        </Grid>
    )
}