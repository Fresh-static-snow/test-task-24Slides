import { CenteredBox } from './CenteredBox';

export const Welcome = (): JSX.Element => (
  <CenteredBox className="gap-4">
    <div className="text-3xl">
      Welcome to Artem Brovko result of refactoring 24Slides test task!
    </div>
    <div>Explore pages and code :)</div>
  </CenteredBox>
);
