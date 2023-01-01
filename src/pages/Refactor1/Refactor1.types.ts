import { Dispatch, SetStateAction } from 'react';

export enum ButtonType {
  FAST = 'fast',
  QUALITY = 'quality',
  CHEAP = 'cheap',
}

export interface ButtonProps {
  button: ButtonType;
  selectedButton: ButtonType | null;
  setSelectedButton: Dispatch<SetStateAction<ButtonType | null>>;
}
