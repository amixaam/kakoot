import { Button } from '@/Components/ui/button';
import {
  Card,
  CardContent,
  CardFooter, 
  CardHeader,
} from '@/Components/ui/card';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

type Quiz = {
  id: number;
  name: string;
  description: string;
  user_id: number;
  created_at: string;
  updated_at: string;
};

export default function Dashboard({ quizzes }: { quizzes: Quiz[] }) {
  console.log(quizzes);

  return (
    <AuthenticatedLayout header={<h2>Dashboard</h2>}>
      <Head title="Dashboard" />

      {/* if no quizzes, then show a messagem if yes quizzes, then show the quizzes */}
      {quizzes.length > 0 ? (
        <div className="flex flex-col gap-4">
          {quizzes.map((quiz) => (
            <Card className="max-w-sm">
              <CardHeader>
                <h3 className="text-xl font-bold">{quiz.name}</h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{quiz.description}</p>
              </CardContent>
              <CardFooter className="justify-between">
                <div className="space-x-2">
                  <Button>
                    <Link href={route('quiz.show', quiz.id)}>Play</Link>
                  </Button>
                  <Button variant="outline">
                    <Link href={route('quiz.edit', quiz.id)}>Edit</Link>
                  </Button>
                </div>
                <Button variant="destructive">
                  <Link href={route('quiz.destroy', quiz.id)}>Delete</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">No quizzes found</h2>
          <p className="text-sm">
            You haven't created any quizzes yet. Create one now!
          </p>
        </div>
      )}
    </AuthenticatedLayout>
  );
}
