import clsx from 'clsx';
import { FC, useState } from 'react';
import { CenteredBox } from '~/components';
import { ButtonType, ButtonProps } from './Refactor1.types';

const Button: FC<ButtonProps> = (props) => {
  const { button, selectedButton, setSelectedButton } = props;
  const style = button === selectedButton;
  return (
    <button
      key={button}
      onClick={() => setSelectedButton(button)}
      className={clsx(
        'h-10 px-5 flex items-center justify-center rounded transition-colors',
        style ? 'bg-green-400' : 'bg-gray-300',
      )}
    >
      {button}
    </button>
  );
};

export const Refactor1 = (): JSX.Element => {
  const [selectedButton, setSelectedButton] = useState<ButtonType | null>(null);
  return (
    <CenteredBox className="gap-4">
      <div className="text-3xl">Now code seems to be better)</div>
      <div className="grid grid-cols-3 gap-2 w-60">
        {Object.values(ButtonType).map((button) => (
          <Button
            key={button}
            button={button}
            selectedButton={selectedButton}
            setSelectedButton={setSelectedButton}
          />
        ))}
      </div>
    </CenteredBox>
  );
};
