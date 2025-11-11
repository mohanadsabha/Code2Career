import { Prisma } from 'generated/prisma';

export type PaginationQueryType = {
  page?: number;
  limit?: number;
  sort?: 'newest' | 'oldest';
};

export type PaginationResponseMeta = {
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
export type PaginatedResult<T> = {
  data: T[];
} & PaginationResponseMeta;

export type TransactionClient = Prisma.TransactionClient;
