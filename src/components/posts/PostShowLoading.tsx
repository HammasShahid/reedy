import { Skeleton } from '@nextui-org/react';

export default function PostShowLoading() {
  return (
    <div className="space-y-4">
      <Skeleton className="h-8 w-1/2" />
      <div className="p-4 border rounded space-y-2">
        <Skeleton className="h-8 w-52" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-44" />
      </div>
    </div>
  );
}
