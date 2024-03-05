import PostList from '@/components/posts/PostList';
import { getPostsBySearchTerm } from '@/db/queries/post';

interface Props {
  searchParams: { term: string };
}

export default async function SearchPage({ searchParams }: Props) {
  return (
    <PostList fetchPosts={() => getPostsBySearchTerm(searchParams.term)} />
  );
}
