import NavBar from '@/components/NavBar';
import { Head, usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
  title: string;
}

export default function DefaultLayout({ title, children }: Props) {
  const user = usePage().props.auth.user;

  return (
    <>
      <Head title={title} />
      <NavBar loggedIn={user != null} />
      <div className="m-auto mx-48 flex min-h-screen flex-col items-center sm:justify-center">
        {children}
      </div>
    </>
  );
}
