'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
// import NextAuthProviders from './NextAuthProviders';
import { Input } from '@/components/ui/input';
import Button from './button';

interface Props {
  callbackUrl?: string;
}

const FormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string({
    required_error: 'Please enter your password',
  }),
});

type InputType = z.infer<typeof FormSchema>;

const SignInForm = (props: Props) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    const result = await signIn('credentials', {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success('Welcome! You have successfully signed');

    router.push(props.callbackUrl ? props.callbackUrl : '/');
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4x p-6 rounded-md"
      >
        <div className="text-xl p-2 text-center font-bold">Sign In</div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="email" className="mb-1 text-textSoft">
            Email
          </label>
          <Input
            className="bg-textSoft text-bgSoft text-lg"
            id="email"
            type="email"
            placeholder="Email"
            {...register('email')}
          />
          {errors?.email?.message && (
            <div className="text-red-400 text-base mt-2">
              {errors?.email?.message}
            </div>
          )}
        </div>
        <div className="flex flex-col col-span-2">
          <label htmlFor="password" className="mb-1 text-textSoft">
            Password
          </label>
          <Input
            className="bg-textSoft text-bgSoft text-lg"
            id="password"
            type="password"
            placeholder="Password"
            {...register('password')}
          />
          {errors?.password?.message && (
            <div className="text-red-400 text-base mt-2">
              {errors?.password?.message}
            </div>
          )}
        </div>
        <div className="mt-5 flex items-center justify-center">
          <Button
            title={isSubmitting ? 'Submitting...' : 'Submit'}
            disabled={false}
            handleClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
