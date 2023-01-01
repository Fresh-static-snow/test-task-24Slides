import { FC } from 'react';
import { CenteredBox } from '~/components';
import { QuestionOrAnswerItem } from './Refactor2.types';

const QnAList: QuestionOrAnswerItem[] = [
  { title: 'Do you run like a fish?', type: 'question' },
  { title: 'Absolutely man', type: 'answer' },
  { title: 'Have you tried to swim like a dinosaur?', type: 'question' },
  { title: 'Nah, not my cup of tea', type: 'answer' },
  { title: 'How are we counting from 5 to 10?', type: 'question' },
  { title: 'Do I look like a counter?', type: 'answer' },
];

const QnaItem: FC<QuestionOrAnswerItem> = ({ title, type }) => {
  switch (type) {
    case 'question':
      <h3 className="font-bold text-lg">{title}</h3>;
    case 'answer':
      return <p className="mb-2">{title}</p>;
  }
};

export const Refactor2 = (): JSX.Element => {
  return (
    <CenteredBox className="gap-2">
      <div className="text-3xl mb-2">o_0</div>
      {QnAList.map((item, index) => (
        <QnaItem key={index} {...item} />
      ))}
    </CenteredBox>
  );
};
