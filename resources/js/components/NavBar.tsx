import { Link } from '@inertiajs/react';

function NavBar({ loggedIn }: { loggedIn: boolean }) {
  var href = '/login';
  if (loggedIn) href = '/dashboard';

  return (
    <div className="fixed flex w-full flex-row items-center justify-between border-b-[1px] border-accent px-16 py-6">
      <Link href="/">
        <h3>Kakoot</h3>
      </Link>
      <div className="flex flex-row gap-8">
        <Link href={href}>Create game</Link>
      </div>
    </div>
  );
}

export default NavBar;
