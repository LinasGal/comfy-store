import { redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

export const formatPrice = (value: string | number) => {
  const price = typeof value === 'string' ? parseInt(value) : value;

  const convertToFloat = parseFloat((price / 100).toFixed(2));

  const dollarsAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(convertToFloat);

  return dollarsAmount;
};

export const throwErrorWithResponse = (error: unknown, msg: string) => {
  const errorWithResponse = error as {
    response?: {
      data?: {
        error?: {
          message?: string;
        };
      };
      status?: number;
    };
  };

  let errorMessage = msg;

  if (errorWithResponse && 'response' in errorWithResponse) {
    errorMessage = errorWithResponse.response?.data?.error?.message || msg;
  }

  toast.error(errorMessage);

  if (
    errorWithResponse.response?.status === 401 ||
    errorWithResponse.response?.status === 403
  ) {
    return redirect('/login');
  }

  return null;
};
