"use client"; 
import React, { useMemo } from "react";
import { AxisOptions, Chart } from "react-charts";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import dayjs from "dayjs";
import { Grid, Typography } from "@mui/material";
import DashboardCard from "../../shared/DashboardCard";

const UserRegistrationBarChart: React.FC = () => {
    const users = useSelector((state: RootState) => state.user.users);
  const userCountsByDate: Record<string, number> = {};

  users.forEach((user) => {
    const formattedDate = dayjs(user.createdAt).format("YYYY-MM-DD");
    userCountsByDate[formattedDate] = (userCountsByDate[formattedDate] || 0) + 1;
  });


  const sortedDates = Object.keys(userCountsByDate).sort();
  const chartData = sortedDates.map((date) => ({
    primary: date, 
    secondary: userCountsByDate[date], 
  }));

  const data = useMemo(
    () => [
      {
        label: "New Users Registered",
        data: chartData,
      },
    ],
    [chartData]
  );

  const primaryAxis = useMemo(
    () => ({
      getValue: (datum: { primary: string }) => datum.primary,
    }),
    []
  );
  const secondaryAxes = React.useMemo<
  AxisOptions<{ primary: string; secondary: number }>[]
>(
  () => [
    {
      getValue: (datum) => datum.secondary,
      elementType: "bar", 
    },
  ],
  []
);


  return (
    <DashboardCard title="Users Creation Over Time">
     <div style={{ width: "100%", height: "400px", margin: "auto" }}>
      {users.length >0 ? <Chart options={{ data, primaryAxis, secondaryAxes }} /> : <Typography>Not Enough Data To Show</Typography>}
     </div>
    </DashboardCard>
  );
};

export default UserRegistrationBarChart;
