import { PaymentMethod, TransactionType } from 'generated/prisma';

export type TransactionResponseDTO = {
  id: string;
  amount: string;
  userId: string;
  createdAt: Date;
  type: TransactionType;
  orderId: string;
  orderReturnId: string | null;
  paymentMethod: PaymentMethod;
};

export type TransactionListResponseDTO = Omit<
  TransactionResponseDTO,
  'orderReturnId'
>;
