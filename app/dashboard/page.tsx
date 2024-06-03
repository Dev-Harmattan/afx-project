import { sendMail } from '@/lib/actions/sendMailAction';
import Card from '../components/card';
import UserTable from '../components/dashboard/table';
import { fetchAllUsers } from '@/lib/actions/userActions';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';

const Dashboard = async () => {
  const users = await fetchAllUsers();
  const session = await getServerSession(authOptions);

  return (
    <div>
      <div className="grid grid-cols-1">
        <Card userData={users} />
        {/* <Card /> */}
      </div>
      <div className="user">
        <UserTable userData={users} currentUser={session?.user} />
      </div>
    </div>
  );
};

export default Dashboard;
