'use client';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const session = useSession();

  if (session.data?.user) {
    return <h1>Signed in: {JSON.stringify(session.data.user)}</h1>;
  } else {
    return <h1>Not signed in</h1>;
  }
}
