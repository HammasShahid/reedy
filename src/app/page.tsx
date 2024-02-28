import TopicCreateForm from '@/components/topics/TopicCreateForm';

export default async function Home() {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-3">
        <h2 className="2xl font-bold">Top Posts</h2>
      </div>
      <div className="col-span-1">
        <TopicCreateForm />
      </div>
    </div>
  );
}
