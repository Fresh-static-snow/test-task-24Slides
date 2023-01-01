export const alertErrorHandler = ({ message, e }: { message: string; e: unknown }) => {
  if (e instanceof Error) {
    alert(`${message}, ${e.message}`);
  } else alert('An unexpected error occurred');
};
