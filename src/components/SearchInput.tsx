'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@nextui-org/react';
import { search } from '@/actions/search';

export default function SearchInput() {
  const searchParams = useSearchParams();

  return (
    <form action={search}>
      <Input placeholder="Search" name="term" defaultValue={searchParams.get('term') || ''} />
    </form>
  );
}
