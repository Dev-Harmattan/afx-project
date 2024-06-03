import Sidebar from '@/app/ui/dashboard/sidebar';
import Navbar from '@/app/ui/dashboard/navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen relative">
      <div className="flex-grow-0 bg-bgSoft p-[20px] fixed top-0 w-64">
        <Sidebar />
      </div>
      <div className="flex-grow ml-64">
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
