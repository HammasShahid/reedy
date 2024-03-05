import { Comment } from '@prisma/client';
import { db } from '@/db';

export interface CommentWithUser extends Comment {
  user: { name: string | null; image: string | null };
}

export function getCommentsByPostId(postId: string): Promise<CommentWithUser[]> {
  return db.comment.findMany({
    where: { postId },
    include: { user: { select: { name: true, image: true } } },
  });
}
