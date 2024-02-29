import { notFound } from 'next/navigation';
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@nextui-org/react';
import { db } from '@/db';
import PostCreateForm from '@/components/posts/PostCreateForm';

interface Props {
  params: { slug: string };
}

export default async function TopicShowPage({ params: { slug } }: Props) {
  const topic = await db.topic.findFirst({ where: { slug } });
  if (!topic) notFound();

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <h1 className="text-4xl mb-4">{topic.slug}</h1>
      </div>
      <div className="col-span-1">
        <Popover placement="left">
          <PopoverTrigger>
            <Button color="primary" className="mb-5">
              Add a post
            </Button>
          </PopoverTrigger>
          <PopoverContent>
            <PostCreateForm topic={topic} />
          </PopoverContent>
        </Popover>
        <div className="border p-4 shadow">
          <h3 className="mb-3 font-bold text-lg">{topic.slug}</h3>
          <p>{topic.description}</p>
        </div>
      </div>
    </div>
  );
}
