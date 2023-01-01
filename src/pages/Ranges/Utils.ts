import { addDays, formatDate } from '~/utils/dateUtils';
import { chooseRandomly, range } from '~/utils/mathUtils';
import { Item, PrefferedColors } from './Ranges.types';

const baseDate = new Date('2022-01-01');

const colors: PrefferedColors[] = ['red', 'green', 'blue'];

export const items: Item[] = range<Item>(40, (index) => ({
  date: formatDate(addDays(baseDate, index)),
  color: chooseRandomly<PrefferedColors>(colors),
}));

export const dataSample = {
  start: '2022-01-01',
  end: '2022-01-03',
  color: 'red',
};

// TODO could we type this stronger, so autocomplete by key works?
export const colorToClassName: Record<PrefferedColors, string> = {
  red: 'bg-red-300 text-red-900',
  green: 'bg-green-300 text-green-900',
  blue: 'bg-blue-300 text-blue-900',
};
