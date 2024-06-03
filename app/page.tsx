import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);
  if (!session?.user) redirect('/auth/signin');

  if (session.user.role !== 'admin') redirect(`events/${session.user.id}`);

  if (session.user) redirect('/dashboard');

  return null;
}
