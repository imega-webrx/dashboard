import * as React from 'react'
import {Grid, Typography} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const scaleProperty = {transform: "scale(3)"}

export default function StartPage() {
    return(
        <Grid container
              alignItems="center"
              justifyContent="center"
              direction={"column"}
              spacing={24}
              sx = {{paddingTop: 5}}
        >
            <Grid item md={4}>
                <Grid container direction={"row"} spacing={6} alignItems={"center"}>
                    <Grid item>
                        <AddCircleIcon fontSize={"large"} sx={scaleProperty}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h3"}>Добавить препарат/категорию</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={4}>
                <Grid container direction={"row"} spacing={6} alignItems={"center"}>
                    <Grid item>
                        <AccountCircleIcon fontSize={"large"} sx={scaleProperty}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h3"}>Информация о профиле</Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item md={4}>
                <Grid container direction={"row"} spacing={6} alignItems={"center"}>
                    <Grid item>
                        <ExitToAppIcon fontSize={"large"} sx={scaleProperty}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={"h3"}>Выйти из системы</Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}