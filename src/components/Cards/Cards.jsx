import React from 'react';
import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import CountUp from 'react-countup';
import styles from './Cards.module.css';

const Cards = ({ data: { confirmed, deaths, lastUpdate, recovered } }) => {
  if(!confirmed) {
    return 'Loading...'
  }
  return (
    <div className={styles.container}>
      <Grid container spacing={3} justify="center">
        <Grid item component={Card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Infected</Typography>
            <Typography variant="h5">
              <CountUp 
                start={0}
                end={confirmed.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">DATE</Typography>
            <Typography variant="body2">Number of active cases</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Recovered</Typography>
            <Typography variant="h5">
              <CountUp 
                start={0}
                end={recovered.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">DATE</Typography>
            <Typography variant="body2">Number of recoveries</Typography>
          </CardContent>
        </Grid>
        <Grid item component={Card}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>Deaths</Typography>
            <Typography variant="h5">
              <CountUp 
                start={0}
                end={deaths.value}
                duration={2.5}
                separator=","
              />
            </Typography>
            <Typography color="textSecondary">DATE</Typography>
            <Typography variant="body2">Number of Deaths</Typography>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  )
}

export default Cards;