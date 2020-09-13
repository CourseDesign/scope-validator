export interface Result<T> {
  ok?: T;
  error?: Error;
}

export const OK = <T>(value?: T): Result<T> => ({ ok: value });

export const ERROR = (error: Error | string): Result<any> => {
  let result: Error;

  if (typeof error === 'string') result = new Error(error);
  else result = error;

  return {
    error: result,
  };
};

export default {
  OK,
  ERROR,
};
