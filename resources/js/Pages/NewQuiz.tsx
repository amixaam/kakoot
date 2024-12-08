import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/Components/ui/radio-group';
import { Switch } from '@/Components/ui/switch';
import { Textarea } from '@/Components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Authenticated from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { Plus, Trash2 } from 'lucide-react';
import React from 'react';

interface Question {
  question: string;
  answers: string[];
  correct_answer: number;
  time: number;
  double_points: boolean;
}

interface QuizFormData {
  name: string;
  description: string;
  questions: Question[];
}

const defaultValues: QuizFormData = {
  name: '',
  description: '',
  questions: [
    {
      question: '',
      answers: ['', ''],
      correct_answer: 0,
      time: 30,
      double_points: false,
    },
  ],
};

export default function NewQuiz() {
  const { data, setData, post, processing, errors, reset, recentlySuccessful } =
    useForm<QuizFormData>(defaultValues);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/quizzes', {
      onSuccess: () => {
        reset();
        toast({
          title: 'Success',
          description: 'Quiz created successfully!',
        });
      },
    });
  };

  const addQuestion = () => {
    setData('questions', [
      ...data.questions,
      {
        question: '',
        answers: ['', ''],
        correct_answer: 0,
        time: 30,
        double_points: false,
      },
    ]);
  };

  const removeQuestion = (index: number) => {
    setData(
      'questions',
      data.questions.filter((_, i) => i !== index),
    );
  };

  const addAnswer = (questionIndex: number) => {
    const newQuestions = [...data.questions];
    newQuestions[questionIndex].answers.push('');
    setData('questions', newQuestions);
  };

  const removeAnswer = (questionIndex: number, answerIndex: number) => {
    const newQuestions = [...data.questions];
    newQuestions[questionIndex].answers = newQuestions[
      questionIndex
    ].answers.filter((_, i) => i !== answerIndex);
    if (
      newQuestions[questionIndex].correct_answer >=
      newQuestions[questionIndex].answers.length
    ) {
      newQuestions[questionIndex].correct_answer = 0;
    }
    setData('questions', newQuestions);
  };

  // @ts-ignore
  const getError = (path: string) => errors[path] as string | undefined;

  return (
    <Authenticated header={<h2>Create New Quiz</h2>}>
      <Head title="New Quiz" />

      <form onSubmit={handleSubmit} className="mx-auto max-w-4xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Create New Quiz</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Quiz Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                className={getError('name') ? 'border-red-500' : ''}
              />
              {getError('name') && (
                <Alert variant="destructive">
                  <AlertDescription>{getError('name')}</AlertDescription>
                </Alert>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                className={getError('description') ? 'border-red-500' : ''}
              />
              {getError('description') && (
                <Alert variant="destructive">
                  <AlertDescription>{getError('description')}</AlertDescription>
                </Alert>
              )}
            </div>
          </CardContent>
        </Card>

        {data.questions.map((question, questionIndex) => (
          <Card key={questionIndex}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Question {questionIndex + 1}</CardTitle>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeQuestion(questionIndex)}
                disabled={data.questions.length === 1}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Question Text</Label>
                <Input
                  value={question.question}
                  onChange={(e) => {
                    const newQuestions = [...data.questions];
                    newQuestions[questionIndex].question = e.target.value;
                    setData('questions', newQuestions);
                  }}
                  className={
                    getError(`questions.${questionIndex}.question`)
                      ? 'border-red-500'
                      : ''
                  }
                />
                {getError(`questions.${questionIndex}.question`) && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {getError(`questions.${questionIndex}.question`)}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-4">
                <Label>Answers</Label>
                <RadioGroup
                  value={question.correct_answer.toString()}
                  onValueChange={(value) => {
                    const newQuestions = [...data.questions];
                    newQuestions[questionIndex].correct_answer =
                      parseInt(value);
                    setData('questions', newQuestions);
                  }}
                  className="space-y-4"
                >
                  {question.answers.map((answer, answerIndex) => (
                    <div key={answerIndex} className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <RadioGroupItem
                          value={answerIndex.toString()}
                          id={`q${questionIndex}-a${answerIndex}`}
                        />
                        <Input
                          value={answer}
                          onChange={(e) => {
                            const newQuestions = [...data.questions];
                            newQuestions[questionIndex].answers[answerIndex] =
                              e.target.value;
                            setData('questions', newQuestions);
                          }}
                          className={`flex-1 ${
                            getError(
                              `questions.${questionIndex}.answers.${answerIndex}`,
                            )
                              ? 'border-red-500'
                              : ''
                          }`}
                          placeholder={`Answer ${answerIndex + 1}`}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            removeAnswer(questionIndex, answerIndex)
                          }
                          disabled={question.answers.length <= 2}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      {getError(
                        `questions.${questionIndex}.answers.${answerIndex}`,
                      ) && (
                        <Alert variant="destructive">
                          <AlertDescription>
                            {getError(
                              `questions.${questionIndex}.answers.${answerIndex}`,
                            )}
                          </AlertDescription>
                        </Alert>
                      )}
                    </div>
                  ))}
                </RadioGroup>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => addAnswer(questionIndex)}
                  className="w-full"
                  disabled={question.answers.length >= 4}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Answer
                </Button>
              </div>

              <div className="space-y-2">
                <Label>Time Limit (seconds)</Label>
                <Input
                  type="number"
                  value={question.time}
                  min={10}
                  max={120}
                  onChange={(e) => {
                    const newQuestions = [...data.questions];
                    newQuestions[questionIndex].time = parseInt(e.target.value);
                    setData('questions', newQuestions);
                  }}
                  className={
                    getError(`questions.${questionIndex}.time`)
                      ? 'border-red-500'
                      : ''
                  }
                />
                {getError(`questions.${questionIndex}.time`) && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      {getError(`questions.${questionIndex}.time`)}
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id={`double-points-${questionIndex}`}
                  checked={question.double_points}
                  onCheckedChange={(checked) => {
                    const newQuestions = [...data.questions];
                    newQuestions[questionIndex].double_points = checked;
                    setData('questions', newQuestions);
                  }}
                />
                <Label htmlFor={`double-points-${questionIndex}`}>
                  Double Points
                </Label>
              </div>
            </CardContent>
          </Card>
        ))}

        <div className="flex gap-4">
          <Button
            type="button"
            variant="secondary"
            onClick={addQuestion}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Question
          </Button>
          <Button type="submit" disabled={processing} className="w-full">
            {processing ? 'Creating Quiz...' : 'Create Quiz'}
          </Button>
        </div>
      </form>
    </Authenticated>
  );
}
