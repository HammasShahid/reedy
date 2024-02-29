'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { Post, Topic } from '@prisma/client';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';

interface PostCreateFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

const createPostSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long'),
  content: z.string().min(10, 'Content must be at least 10 characters long'),
});

export async function createPost(
  topic: Topic,
  formState: PostCreateFormState,
  formData: FormData
): Promise<PostCreateFormState> {
  const session = await auth();

  if (!session || !session.user || !session.user.id) {
    return { errors: { _form: ['You must be logged in to create a post'] } };
  }

  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: { _form: [err.message] },
      };
    }
    return {
      errors: {
        _form: ['Something went wrong'],
      },
    };
  }

  revalidatePath(paths.topicShow(topic.slug));
  redirect(paths.postShow(topic.slug, post.id));
}
