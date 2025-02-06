"use client"; // Ensures client-side rendering

import React from 'react'
import DashboardCard from '../../shared/DashboardCard'
import { Grid, Typography } from '@mui/material'
interface KpiData {
    title: string;
    value: number;
  }
  
const TotalUsersKpi = ({value, title}:KpiData) => {
  return (
    <DashboardCard title={title}>
    <Grid container spacing={3}>
      {/* column */}
      <Grid item xs={7} sm={7}>
        <Typography variant="h3" fontWeight="700"> 
{value}        </Typography>
       
       
      </Grid>
      {/* column */}
     
    </Grid>
  </DashboardCard>
  )
}

export default TotalUsersKpi