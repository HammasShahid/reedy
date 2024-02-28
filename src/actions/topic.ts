'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import { Topic } from '@prisma/client';
import paths from '@/paths';

interface CreateTopicFormState {
  errors: {
    slug?: string[];
    description?: string[];
    _form?: string[];
  };
}

const createTopicSchema = z.object({
  slug: z
    .string()
    .min(3, 'Slug must be at least 3 characters long')
    .regex(/[a-z-]+$/, {
      message: 'Slug must only include alphabets and dashes',
    }),
  description: z
    .string()
    .min(5, 'Description must be at least 5 characters long'),
});

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const session = await auth();
  if (!session?.user) {
    return { errors: { _form: ['You must be logged in to create a topic'] } };
  }

  const slug = formData.get('slug');
  const description = formData.get('description');

  const result = createTopicSchema.safeParse({ slug, description });

  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: { slug: result.data.slug, description: result.data.description },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return { errors: { _form: [err.message] } };
    }
    return { errors: { _form: ['Something went wrong'] } };
  }

  revalidatePath(paths.home());
  redirect(paths.topicShow(topic.slug));
}
