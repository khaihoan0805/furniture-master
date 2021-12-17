export interface IError extends Error {
    status: number;
    type: string;
    details: any;
}

export * from './error-factory';
  