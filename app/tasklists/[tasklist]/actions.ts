'use server';

import OpenAI from 'openai';
import { getClient } from '@/lib/client';
import { GetTasksDocument } from '@/graphql/generated';

export async function generateLabelGPT(prompt: string) {
  if (!prompt || prompt.length < 2) return Promise.reject('Task length too short');

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: 'Responses should not contain quotes',
      },
      {
        role: 'user',

        content: `Generate a one-word label for the following task: \n` + prompt,
      },
    ],
    max_tokens: 100,
    temperature: 1,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const quote = completion.choices[0].message;

  return quote;
}

export async function getTasks(tasklistName: string, date: string) {
  const client = getClient();
  const {data} = await client.query({query: GetTasksDocument, variables: {tasklistName}, fetchPolicy: 'no-cache'});
  let tasks = data.tasks;
  if (date) {
    tasks = tasks.filter((task) => task?.dueDate && task.dueDate.includes(date));
  }

  return tasks;
}