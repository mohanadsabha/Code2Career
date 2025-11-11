import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { PaginatedResult, PaginationQueryType } from 'src/types/util.types';
import { TransactionListResponseDTO } from './dto/transaction.dto';
import { removeFields } from 'src/utils/object.util';
import { Prisma } from 'generated/prisma';

@Injectable()
export class TransactionService {
  constructor(private readonly prismaService: DatabaseService) {}

  /**
   * Get all transactions for a specific user
   * Supports pagination and sorting by newest (createdAt)
   */
  async findAllByUserId(
    userId: bigint,
    query: PaginationQueryType,
  ): Promise<PaginatedResult<TransactionListResponseDTO>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const sortOrder = query.sort === 'oldest' ? 'asc' : 'desc';

      const transactions = await prisma.userTransaction.findMany({
        ...removeFields(pagination, ['page']),
        where: { userId },
        orderBy: { createdAt: sortOrder },
        select: {
          id: true,
          amount: true,
          userId: true,
          createdAt: true,
          type: true,
          orderId: true,
          paymentMethod: true,
        },
      });

      const count = await prisma.userTransaction.count({
        where: { userId },
      });

      // Transform BigInt fields to strings
      const formattedTransactions = transactions.map((tx) => ({
        ...tx,
        id: String(tx.id),
        userId: String(tx.userId),
        orderId: String(tx.orderId),
        amount: String(tx.amount),
      }));

      return {
        data: formattedTransactions,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  /**
   * Get all transactions in the system (Admin only)
   * Supports pagination and sorting by newest (createdAt)
   */
  async findAll(
    query: PaginationQueryType,
  ): Promise<PaginatedResult<TransactionListResponseDTO>> {
    return this.prismaService.$transaction(async (prisma) => {
      const pagination = this.prismaService.handleQueryPagination(query);
      const sortOrder = query.sort === 'oldest' ? 'asc' : 'desc';

      const transactions = await prisma.userTransaction.findMany({
        ...removeFields(pagination, ['page']),
        orderBy: { createdAt: sortOrder },
        select: {
          id: true,
          amount: true,
          userId: true,
          createdAt: true,
          type: true,
          orderId: true,
          paymentMethod: true,
        },
      });

      const count = await prisma.userTransaction.count();

      // Transform BigInt fields to strings
      const formattedTransactions = transactions.map((tx) => ({
        ...tx,
        id: String(tx.id),
        userId: String(tx.userId),
        orderId: String(tx.orderId),
        amount: String(tx.amount),
      }));

      return {
        data: formattedTransactions,
        ...this.prismaService.formatPaginationResponse({
          page: pagination.page,
          count,
          limit: pagination.take,
        }),
      };
    });
  }

  /**
   * Get a single transaction by ID
   */
  async findOne(id: bigint) {
    return this.prismaService.userTransaction.findUniqueOrThrow({
      where: { id },
    });
  }

  /**
   * Get transactions for a specific order (for admin or user)
   */
  async findByOrderId(orderId: bigint) {
    return this.prismaService.userTransaction.findMany({
      where: { orderId },
    });
  }
}
