import { Divider } from '@nextui-org/react';
import TopicCreateForm from '@/components/topics/TopicCreateForm';
import TopicList from '@/components/topics/TopicList';
import PostList from '@/components/posts/PostList';
import { getTopPosts } from '@/db/queries/post';

export default async function Home() {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <h2 className="text-2xl font-bold mb-5">Top Posts</h2>
        <PostList fetchPosts={getTopPosts} />
      </div>
      <div className="col-span-1 flex flex-col gap-4 border shadow py-4 px-2">
        <TopicCreateForm />
        <Divider />
        <p className="text-lg">Topics</p>
        <TopicList />
      </div>
    </div>
  );
}
