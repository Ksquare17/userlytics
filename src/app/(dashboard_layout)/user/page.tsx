
'use client';

import PageContainer from "../container/PageContainer";
import DashboardCard from "../shared/DashboardCard";
import UserDataForm from "./components/Form";

const User = () => {
  return (
    <PageContainer title="User" description="this is User page">
      <DashboardCard title="User">
     <UserDataForm/>
      </DashboardCard>
      </PageContainer>
  )
}

export default User