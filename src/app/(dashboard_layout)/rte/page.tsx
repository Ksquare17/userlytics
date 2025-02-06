
'use client';

import PageContainer from "../container/PageContainer";
import DashboardCard from "../shared/DashboardCard";
import UserDataEditor from "./components/Quill";

const User = () => {
  return (
    <PageContainer title="RTE" description="this is RTE page">
      <DashboardCard title="RTE">
   <UserDataEditor/>
      </DashboardCard>
      </PageContainer>
  )
}

export default User