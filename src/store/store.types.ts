export type TBill = {
  id: string;
  enabled: boolean;
  date: string;
  name: string;
  slug: string;
  type: TTypeBill;
};

export type TMutResponse = {
  success: boolean;
  id: string;
  message: string;
};

export type TPayment = {
  bill: {
    id: string;
    name: string;
    slug: string;
    type: TTypeBill;
  };
  amount: number;
};

export type TPaymentsResponse = {
  year: string;
  payments: {
    month: string;
    payments: TPayment[];
    updatedAt: {
      nanoseconds: number;
      seconds: number;
      type: string;
    };
  }[];
};

export type TTypeBill = 'bill' | 'other';
