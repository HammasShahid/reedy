'use client';

import { useFormState } from 'react-dom';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  Input,
  Textarea,
} from '@nextui-org/react';
import { createTopic } from '@/actions/topic';
import FormButton from '@/components/FormButton';

export default function TopicCreateForm() {
  const [formState, action] = useFormState(createTopic, { errors: {} });
  return (
    <div>
      <Popover placement="left">
        <PopoverTrigger>
          <Button variant="bordered" color="default">
            Add a topic
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <h3 className="font-bold text-lg">Create a topic</h3>
          <form action={action} className="flex flex-col gap-4 w-80">
            <Input
              name="slug"
              label="Slug"
              labelPlacement="outside"
              isInvalid={!!formState.errors.slug}
              errorMessage={formState.errors.slug?.join(', ')}
            />
            <Textarea
              name="description"
              label="Description"
              labelPlacement="outside"
              placeholder="Topic description"
              isInvalid={!!formState.errors.description}
              errorMessage={formState.errors.description?.join(', ')}
            ></Textarea>

            <FormButton>Add</FormButton>

            {formState.errors._form && (
              <div className="text-red-600 bg-red-100 p-4 rounded">
                {formState.errors._form.join('\n')}
              </div>
            )}
          </form>
        </PopoverContent>
      </Popover>
    </div>
  );
}
