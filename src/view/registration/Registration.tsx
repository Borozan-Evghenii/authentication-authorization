import { Form, useForm } from 'react-hook-form';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';

const Registration = () => {
  const form = useForm({
    defaultValues: {
      name: '',
      username: '',
      country: '',
      phone: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  });

  const onSubmit = () => {};

  return (
    <div>
      <Form {...form}>
        <form onSubmit={() => form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter Username' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};

export default Registration;
