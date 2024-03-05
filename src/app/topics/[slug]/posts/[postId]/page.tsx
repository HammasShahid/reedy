import Link from 'next/link';
import PostShow from '@/components/posts/PostShow';
import paths from '@/paths';
import CommentCreateForm from '@/components/comments/CommentCreateForm';
import CommentList from '@/components/comments/CommentList';
import { getCommentsByPostId } from '@/db/queries/comment';

interface Props {
  params: { postId: string; slug: string };
}

export default function PostShowPage({ params: { postId, slug } }: Props) {
  return (
    <div className="space-y-9">
      <Link className="underline decoration-solid" href={paths.topicShow(slug)}>
        {'< '}Back to {slug}
      </Link>
      <PostShow postId={postId} />
      <CommentCreateForm postId={postId} startOpen />
      <CommentList getComments={() => getCommentsByPostId(postId)} />
    </div>
  );
}
