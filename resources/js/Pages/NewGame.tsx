import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  description: z.string(),
});

export default function NewGame() {
  const [questionCount, setQuestionCount] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <AuthenticatedLayout header={<h2>Create a new game</h2>}>
      <Head title="New Game" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <h3>Game metadata</h3>

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Description..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4 pt-4">
            <h3>Questions</h3>
            <Button
              type="button"
              size="icon"
              variant="secondary"
              onClick={() => setQuestionCount(questionCount + 1)}
            >
              <Plus />
            </Button>
          </div>
          {Array.from({ length: questionCount }, (_, index) => (
            <QuestionFormItem key={index} index={index} form={form} />
          ))}
          <Button
            type="submit"
            size="lg"
            disabled={form.formState.isSubmitting || !questionCount}
          >
            Submit
          </Button>
        </form>
      </Form>
    </AuthenticatedLayout>
  );
}

type QuestionFormItemProps = {
  index: number;
  form: UseFormReturn<z.infer<typeof formSchema>>;
};
const QuestionFormItem = ({ index, form }: QuestionFormItemProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Question #{index + 1}</CardTitle>
        <Button variant="outline" size="icon">
          <X />
        </Button>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
