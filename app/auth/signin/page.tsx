import ClientNavbar from '@/app/components/clientNavbar';
import SignInForm from '@/app/components/signinForm';
import Link from 'next/link';

const SigninPage = () => {
  return (
    <div className="h-screen">
      <ClientNavbar />
      <SignInForm />
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div className="md:col-span-2 flex justify-center items-center">
          <p className="p-2 text-textSoft">You need to Sign Up?</p>
          <Link href={'/auth/signup'}>Sign Up.</Link>
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
