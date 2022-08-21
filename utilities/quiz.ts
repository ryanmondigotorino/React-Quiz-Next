import { Quiz } from '@prisma/client';

export const constructPublishLink = (quiz: Quiz) => {
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}/published/${quiz.url}`;
  }
};
