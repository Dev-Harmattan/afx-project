import ClientNavbar from '@/app/components/clientNavbar';
import SignupForm from '@/app/components/signupForm';
import Link from 'next/link';
import React from 'react';

const SignupPage = () => {
  return (
    <div className="min-h-screen">
      <ClientNavbar />
      <SignupForm />
      <div className="grid grid-cols-1 md:grid-cols-2 justify-center items-center">
        <div className="md:col-span-2 flex justify-center items-center">
          <p className="p-2 text-textSoft">Already Sign Up?</p>
          <Link href={'/auth/signin'}>Sign in.</Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
