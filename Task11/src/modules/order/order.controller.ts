import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Req,
  Query,
  Patch,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/decorators/roles.decorator';
import type {
  CreateOrderDTO,
  CreateOrderResponseDTO,
  CreateOrderReturnDTO,
  OrderOverviewResponseDTO,
  OrderResponseDTO,
} from './types/order.dto';
import { ZodValidationPipe } from 'src/pipes/zod-validation.pipe';
import {
  createOrderDTOValidationSchema,
  createReturnDTOValidationSchema,
  updateOrderStatusValidationSchema,
  updateReturnStatusValidationSchema,
} from './util/order.validation.schema';
import { paginationSchema } from 'src/utils/api.util';
import type {
  PaginatedResult,
  PaginationQueryType,
} from 'src/types/util.types';

@Controller('order')
@Roles(['CUSTOMER'])
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(
    @Body(new ZodValidationPipe(createOrderDTOValidationSchema))
    createOrderDto: CreateOrderDTO,

    @Req() request: Express.Request,
  ): Promise<CreateOrderResponseDTO> {
    return this.orderService.create(createOrderDto, BigInt(request.user!.id));
  }

  @Get()
  findAll(
    @Req() request: Express.Request,

    @Query(new ZodValidationPipe(paginationSchema))
    query: PaginationQueryType,
  ): Promise<PaginatedResult<OrderOverviewResponseDTO>> {
    return this.orderService.findAll(BigInt(request.user!.id), query);
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Req() request: Express.Request,
  ): Promise<OrderResponseDTO> {
    return this.orderService.findOne(+id, BigInt(request.user!.id));
  }

  // returns end points

  // create return
  @Post('return')
  createReturn(
    @Body(new ZodValidationPipe(createReturnDTOValidationSchema))
    createReturnDto: CreateOrderReturnDTO,
    @Req() request: Express.Request,
  ): Promise<OrderResponseDTO> {
    return this.orderService.createReturn(
      createReturnDto,
      BigInt(request.user!.id),
    );
  }

  // Admin endpoints

  /**
   * Get all orders (Admin only)
   */
  @Roles(['ADMIN'])
  @Get('admin/all')
  getAllOrdersAdmin(
    @Query(new ZodValidationPipe(paginationSchema))
    query: PaginationQueryType,
  ): Promise<PaginatedResult<OrderOverviewResponseDTO>> {
    return this.orderService.findAllAdmin(query);
  }

  /**
   * Update order status (Admin only)
   */
  @Roles(['ADMIN'])
  @Patch(':id/status')
  updateOrderStatus(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateOrderStatusValidationSchema))
    payload: { status: 'PENDING' | 'SUCCESS' },
  ): Promise<OrderResponseDTO> {
    return this.orderService.updateOrderStatus(BigInt(id), payload.status);
  }

  /**
   * Update return status (Admin only)
   */
  @Roles(['ADMIN'])
  @Patch('return/:returnId/status')
  updateReturnStatus(
    @Param('returnId') returnId: string,
    @Body(new ZodValidationPipe(updateReturnStatusValidationSchema))
    payload: { status: 'PICKED' | 'REFUND' | 'PENDING' },
  ) {
    return this.orderService.updateReturnStatus(
      BigInt(returnId),
      payload.status,
    );
  }
}
