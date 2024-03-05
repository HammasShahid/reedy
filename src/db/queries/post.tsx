import { Post } from '@prisma/client';
import { db } from '@/db';

export interface PostListItem extends Post {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
}

export async function getPostsByTopicSlug(
  topicSlug: string
): Promise<PostListItem[]> {
  return await db.post.findMany({
    where: { topic: { slug: topicSlug } },
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
  });
}

export async function getTopPosts(): Promise<PostListItem[]> {
  return await db.post.findMany({
    orderBy: { comments: { _count: 'desc' } },
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
    take: 5,
  });
}

export async function getPostsBySearchTerm(term: string) {
  return await db.post.findMany({
    where: {
      OR: [{ title: { contains: term } }, { content: { contains: term } }],
    },
    include: {
      user: { select: { name: true } },
      topic: { select: { slug: true } },
      _count: { select: { comments: true } },
    },
  });
}
