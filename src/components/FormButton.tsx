import { useFormStatus } from 'react-dom';
import { Button } from '@nextui-org/react';

interface Props {
  children: React.ReactNode;
}

export default function FormButton({ children }: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="flat" color="primary" isLoading={pending}>
      {children}
    </Button>
  );
}
