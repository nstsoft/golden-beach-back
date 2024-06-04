import { Request } from 'express';
import { DeleteResult, UpdateResult } from 'typeorm';
export type Pagination = {
  skip: number;
  limit: number;
};

export type AppRequest = Request & {
  pagination: Pagination;
};

export type Deleted = DeleteResult;
export type Updated = UpdateResult;
