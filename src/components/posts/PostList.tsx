import type { Post, User, Topic } from '@prisma/client';
import Link from 'next/link';
import paths from '@/paths';
import { PostListItem } from '@/db/queries/post';

interface Props {
  fetchPosts: () => Promise<PostListItem[]>;
}

// TODO: Get list of posts into this component somehow
export default async function PostList({ fetchPosts }: Props) {
  const posts = await fetchPosts();

  const renderedPosts = posts.map((post) => {
    const topicSlug = post.topic.slug;

    if (!topicSlug) {
      throw new Error('Need a slug to link to a post');
    }

    return (
      <div key={post.id} className="border rounded p-2">
        <Link href={paths.postShow(topicSlug, post.id)}>
          <h3 className="text-lg font-bold mb-2">{post.title}</h3>
          <div className="flex gap-8">
            <p className="text-xs text-gray-400">By {post.user.name}</p>
            <p className="text-xs text-gray-400">
              {post._count.comments} comments
            </p>
          </div>
        </Link>
      </div>
    );
  });

  return <div className="space-y-2">{renderedPosts}</div>;
}
