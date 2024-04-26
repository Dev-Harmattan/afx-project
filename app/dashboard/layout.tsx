import Sidebar from '@/app/ui/dashboard/sidebar';
import Navbar from '@/app/ui/dashboard/navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-[100vh]">
      <div className="flex-grow-1 bg-[#182237] p-[20px]">
        <Sidebar />
      </div>
      <div className="flex-grow">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
