import type { Property } from 'csstype';

export type PrefferedColors = Extract<Property.Color, 'red' | 'blue' | 'green'>;

export interface Item {
  date: string;
  color: PrefferedColors; //or we can use DefaultColors from tailwindcss
}

export interface Range {
  start: string;
  end: string;
  color: PrefferedColors;
}
