'use client';
import { Input } from '@/components/ui/input';
import React, { useEffect, useState } from 'react';
import Button from './button';
import { z } from 'zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { passwordStrength } from 'check-password-strength';
import { Slider } from '@/components/ui/slider';
import PasswordStrength from './passwordStrength';
import { registerUser } from '@/lib/actions/authActions';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, 'First name must be at least 2 characters.')
      .max(45, 'First must less than 45 characters.')
      .regex(new RegExp('^[a-zA-Z]+$')),
    lastName: z
      .string()
      .min(2, 'Last name must be at least 2 characters.')
      .max(45, 'Last must less than 45 characters.')
      .regex(new RegExp('^[a-zA-Z]+$')),
    email: z.string().email('Please enter a valid email address.'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .max(50, 'Password must less than 50 characters.'),
    confirmPassword: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .max(50, 'Password must less than 50 characters.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password and Confirm Password doesn't match.",
    path: ['confirmPassword'],
  });

type InputType = z.infer<typeof FormSchema>;

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const [userPasswordStrength, setUserPasswordStrength] = useState<number>(0);
  const router = useRouter();

  useEffect(() => {
    setUserPasswordStrength(passwordStrength(watch().password).id);
  }, [watch().password]);

  const saveUser: SubmitHandler<InputType> = async (data) => {
    try {
      const { confirmPassword, email, firstName, lastName, password } = data;
      const user: any = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role: 'admin',
        created_at: new Date(),
        updated_at: new Date(),
      };
      const result = await registerUser(user);
      toast.success('User successfully registered');
      router.push('/auth/signin');
    } catch (error) {
      toast.error('Something went wrong');
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(saveUser)}
        className="w-full max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4x p-6 rounded-md"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="firstName" className="mb-1 text-textSoft">
              First Name
            </label>
            <Input
              className="bg-textSoft text-bgSoft text-lg focus:bg-textSoft"
              id="firstName"
              type="text"
              placeholder="First Name"
              {...register('firstName')}
            />
            {errors?.firstName?.message && (
              <div className="text-red-400 text-base mt-2">
                {errors?.firstName?.message}
              </div>
            )}
          </div>
          <div className="flex flex-col col-span-2 md:col-span-1">
            <label htmlFor="lastName" className="mb-1 text-textSoft">
              Last Name
            </label>
            <Input
              className="bg-textSoft text-bgSoft text-lg "
              id="lastName"
              type="text"
              placeholder="Last Name"
              {...register('lastName')}
            />
            {errors?.lastName?.message && (
              <div className="text-red-400 text-base mt-2">
                {errors?.lastName?.message}
              </div>
            )}
          </div>
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
          <PasswordStrength passStrength={userPasswordStrength} />
          <div className="flex flex-col col-span-2">
            <label htmlFor="password" className="mb-1 text-textSoft">
              Confirm Password
            </label>
            <Input
              className="bg-textSoft text-bgSoft text-lg focus:bg-textSoft"
              id="confirmPassword"
              type="password"
              placeholder="Password"
              {...register('confirmPassword')}
            />
            {errors?.confirmPassword?.message && (
              <div className="text-red-400 text-base mt-2">
                {errors?.confirmPassword?.message}
              </div>
            )}
          </div>
        </div>
        <div className="mt-5 flex items-center justify-center">
          <Button title="Submit" disabled={false} handleClick={() => {}} />
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
