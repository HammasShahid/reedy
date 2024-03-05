import CommentShow from '@/components/comments/CommentShow';
import { CommentWithUser } from '@/db/queries/comment';

interface Props {
  getComments: () => Promise<CommentWithUser[]>;
}

// TODO: Get a list of comments from somewhere
export default async function CommentList({ getComments }: Props) {
  const comments = await getComments();

  const topLevelComments = comments.filter(
    (comment) => comment.parentId === null
  );
  const renderedComments = topLevelComments.map((comment) => {
    return (
      <CommentShow
        key={comment.id}
        commentId={comment.id}
        comments={comments}
      />
    );
  });

  return (
    <div className="space-y-3">
      <h1 className="text-lg font-bold">{comments.length} comments</h1>
      {renderedComments}
    </div>
  );
}
