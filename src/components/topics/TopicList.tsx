import Link from 'next/link';
import { db } from '@/db';
import { Chip } from '@nextui-org/react';
import paths from '@/paths';

export default async function TopicList() {
  const topics = await db.topic.findMany();

  return (
    <div className="flex flex-wrap gap-3">
      {topics.map((topic) => (
        <Link key={topic.id} href={paths.topicShow(topic.slug)}>
          <Chip variant="shadow" className="bg-green-200 p-3 pb-4">
            {topic.slug}
          </Chip>
        </Link>
      ))}
    </div>
  );
}
