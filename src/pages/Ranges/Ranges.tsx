/* eslint-disable */
import clsx from 'clsx';
import untypedItems from './items.json';
import untypedRanges from './ranges.json';
import { Item, PrefferedColors, Range } from './Ranges.types';
import { colorToClassName, dataSample } from './Utils';
import { FC } from 'react';

const items = untypedItems as Item[];
const ranges = untypedRanges as Range[];

const merge = (items: Item[]): Range[] => {
  const ranges: Range[] = [];

  let currentRange: Range | null = null;
  for (const item of items) {
    if (currentRange && currentRange.color === item.color) {
      currentRange.end = item.date;
    } else {
      currentRange = { start: item.date, end: item.date, color: item.color };
      ranges.push(currentRange);
    }
  }

  return ranges;
};

const RangesView: FC<{ ranges: Range[] }> = ({ ranges }) => (
  <ul className="space-y-4">
    {ranges.map((item) => (
      <li
        key={item.start + item.end}
        className={clsx(
          'h-10 flex items-center justify-between px-5 rounded',
          colorToClassName[item.color as PrefferedColors],
        )}
      >
        <span>{item.start}</span>
        <span>{item.end}</span>
      </li>
    ))}
  </ul>
);

export const Ranges = () => {
  return (
    <div className="max-w-screen-xl mx-auto py-4 grid grid-cols-3 gap-8">
      <div className="col-span-3">
        <h2 className="text-2xl mb-4">Convert adjacent items of same type into ranges</h2>
        <p>The data of individual item should look like this: </p>
        <pre>{JSON.stringify(dataSample, null, 2)}</pre>
      </div>

      <h3 className="text-xl font-bold row-start-2">Discretes</h3>
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.date}
            className={clsx(
              'h-10 flex items-center px-5 rounded',
              colorToClassName[item.color as PrefferedColors],
            )}
          >
            {item.date}
          </li>
        ))}
      </ul>

      <h3 className="text-xl font-bold row-start-2">Ranges example</h3>
      <RangesView ranges={ranges} />

      <h3 className="text-xl font-bold row-start-2">Ranges implementation</h3>
      <RangesView ranges={merge(items)} />
    </div>
  );
};
