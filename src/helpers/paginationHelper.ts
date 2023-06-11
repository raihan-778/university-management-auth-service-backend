import { SortOrder } from 'mongoose';

type IOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder; // here we have imported sortorder type from mongoose insted of defining manualy "asc" or "desc"
};

type IOptionResults = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder; // here we have imported sortorder type from mongoose insted of defining manualy "asc" or "desc"
};

const calculatePagination = (options: IOption): IOptionResults => {
  const page = Number(options.page || 1);
  const limit = Number(options.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};
export const paginationHelper = {
  calculatePagination,
};
