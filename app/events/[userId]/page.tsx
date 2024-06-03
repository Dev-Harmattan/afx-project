import ClientNavbar from '@/app/components/clientNavbar';
import UserEvent from '@/app/components/userEvent';

const page = ({ params }: { params: { userId: string } }) => {
  return (
    <div className="h-screen">
      <ClientNavbar />
      <UserEvent userId={params.userId} />
    </div>
  );
};

export default page;
