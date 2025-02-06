
'use client';

import { Box, Grid } from "@mui/material";
import PageContainer from "../container/PageContainer";
import DashboardCard from "../shared/DashboardCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, User } from '@/app/store/UserSlice'; 
import Counter from "./components/Counter";
import TotalUsersKpi from "./components/TotalUsersKpi";
import UserGrowth from "./components/UserGrowth";
import { RootState } from "@/app/store";
const Dashboard = () => {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   try {
  //     const storedUsers = localStorage.getItem('users');
  //     if (storedUsers) {
  //       const parsedUsers: User[] = JSON.parse(storedUsers);
        
  //       if (parsedUsers.length > 0) {
  //         // Dispatch each user to Redux store
  //         parsedUsers.forEach((user: User) => {
  //           dispatch(addUser(user));
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Failed to load users from localStorage', error);
  //   }
  // }, [dispatch]);
  const users = useSelector((state: RootState) => state.user.users);

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  // Filter users created today
  const usersCreatedToday = users.filter((user) => 
    user.createdAt.split("T")[0] === today
  );
  return (
    <PageContainer title="Dashboard" description="this is dashboard page">
      <DashboardCard title="Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={8}>
          <Counter />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TotalUsersKpi value={users.length} title="Total Users"/>
              </Grid>
              <Grid item xs={12}>
              <TotalUsersKpi  value={usersCreatedToday.length} title="Total Form Submissions Today"/>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={12}>
          <UserGrowth />
          </Grid>
         
        </Grid>
      </Box>
        
      </DashboardCard>
    </PageContainer>
  );
};

export default Dashboard;

