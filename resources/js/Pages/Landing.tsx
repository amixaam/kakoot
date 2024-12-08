import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/Components/ui/form';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/Components/ui/input-otp';

import DefaultLayout from '@/Layouts/DefaultLayout';
import { PageProps } from '@/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from '@inertiajs/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  pin: z.string().min(6, {
    message: 'PIN must be exactly 6 characters long',
  }),
});

export default function Welcome({}: PageProps<{}>) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    router.post(route('game.validate'));
  }

  return (
    <DefaultLayout title="Enter Pin">
      <h1>Kakoot!</h1>
      <div className="mt-2 flex flex-col items-center justify-center gap-4">
        <p>
          A rip-off of <Link href="https://kahoot.com">Kahoot!</Link> for the
          web. Enter a pin to start the game.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-row items-end gap-4"
          >
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </DefaultLayout>
  );
}
