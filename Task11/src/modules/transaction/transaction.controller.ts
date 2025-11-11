import { Controller, Get, Query, Req } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { Roles } from 'src/decorators/roles.decorator';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import { paginationSchema } from 'src/utils/api.util';
import { PaginationQueryType, PaginatedResult } from 'src/types/util.types';
import { TransactionListResponseDTO } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  /**
   * Get user's own transactions
   */
  @Roles(['CUSTOMER', 'MERCHANT', 'ADMIN'])
  @Get('my-transactions')
  getMyTransactions(
    @Req() request: Express.Request,
    @Query(new ZodValidationPipe(paginationSchema))
    query: PaginationQueryType,
  ): Promise<PaginatedResult<TransactionListResponseDTO>> {
    return this.transactionService.findAllByUserId(
      BigInt(request.user!.id),
      query,
    );
  }

  /**
   * Get all transactions in the system (Admin only)
   */
  @Roles(['ADMIN'])
  @Get()
  getAllTransactions(
    @Query(new ZodValidationPipe(paginationSchema))
    query: PaginationQueryType,
  ): Promise<PaginatedResult<TransactionListResponseDTO>> {
    return this.transactionService.findAll(query);
  }
}
