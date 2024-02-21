import { signIn, signOut } from '@/actions';
import { Button } from '@nextui-org/react';
import { auth } from '@/auth';
import Profile from '@/components/Profile';

export default async function Home() {
  const session = await auth();
  return (
    <>
      {!session?.user && (
        <form action={signIn}>
          <Button type="submit">Sign In</Button>
        </form>
      )}
      {session?.user && (
        <div>
          <form action={signOut}>
            <Button type="submit">Sign Out</Button>
          </form>
        </div>
      )}
      <Profile />
    </>
  );
}
