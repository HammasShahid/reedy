'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Input, Textarea } from '@nextui-org/react';
import { createPost } from '@/actions/post';
import FormButton from '@/components/FormButton';
import { Topic } from '@prisma/client';

interface Props {
  topic: Topic;
}

export default function PostCreateForm({ topic }: Props) {
  const [formState, action] = useFormState(createPost.bind(null, topic), {
    errors: {},
  });

  return (
    <div className="p-3">
      <p className="text-xl mb-1">Add a new post</p>
      <form action={action} className="flex flex-col gap-4 w-80">
        <Input
          name="title"
          label="Title"
          labelPlacement="outside"
          isInvalid={!!formState.errors.title}
          errorMessage={formState.errors.title?.join(', ')}
        />
        <Textarea
          name="content"
          label="Content"
          labelPlacement="outside"
          isInvalid={!!formState.errors.title}
          errorMessage={formState.errors.content?.join(', ')}
        ></Textarea>

        <FormButton>Add</FormButton>

        {formState.errors._form && (
          <div className="text-red-600 bg-red-100 p-4 rounded">
            {formState.errors._form.join(', ')}
          </div>
        )}
      </form>
    </div>
  );
}
