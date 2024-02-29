'use client';

import { useFormStatus } from 'react-dom';
import { Input, Textarea } from '@nextui-org/react';
import { createPost } from '@/actions/post';
import FormButton from '@/components/FormButton';

export default function PostCreateForm() {
  return (
    <div className="p-3">
      <p className="text-xl mb-1">Add a new post</p>
      <form action={createPost} className="flex flex-col gap-4 w-80">
        <Input label="Title" labelPlacement="outside" name="title" />
        <Textarea label="Content" labelPlacement="outside"></Textarea>
        <FormButton>Add</FormButton>
      </form>
    </div>
  );
}
