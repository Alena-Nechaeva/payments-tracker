import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { TBill, TMutResponse, TPayment, TPaymentsResponse, TTypeBill } from '@/src/store/store.types';
import { auth } from '@/src/lib/firebase/client';

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: async headers => {
      const user = auth.currentUser;
      if (user) {
        const token = await user.getIdToken();
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  tagTypes: ['Bills', 'Payments'],
  endpoints: build => ({
    getBills: build.query<{ bills: TBill[] }, void>({
      query: () => `/bills`,
      providesTags: ['Bills']
    }),
    addBill: build.mutation<TMutResponse, { name: string; type: TTypeBill }>({
      query: body => {
        return {
          url: `/bills`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: result => (!result ? [] : ['Bills'])
    }),
    deleteBill: build.mutation<TMutResponse, string>({
      query: billId => {
        return {
          url: `/bills/${billId}`,
          method: 'DELETE'
        };
      },
      invalidatesTags: result => (!result ? [] : ['Bills'])
    }),
    editBill: build.mutation<TMutResponse, { name: string; billId: string; type: TTypeBill }>({
      query: ({ name, billId, type }) => {
        return {
          url: `/bills/${billId}`,
          method: 'PUT',
          body: { name, type }
        };
      },
      invalidatesTags: result => (!result ? [] : ['Bills'])
    }),
    disableBill: build.mutation<TMutResponse, { enabled: boolean; billId: string }>({
      query: ({ enabled, billId }) => {
        return {
          url: `/bills/${billId}`,
          method: 'PATCH',
          body: { enabled }
        };
      },
      invalidatesTags: result => (!result ? [] : ['Bills'])
    }),

    getPayments: build.query<TPaymentsResponse, void>({
      query: () => `/payments`,
      providesTags: ['Payments']
    }),
    updatePayment: build.mutation<TMutResponse, { month: string; payments: TPayment[] }>({
      query: body => {
        return {
          url: `/payments`,
          method: 'POST',
          body
        };
      },
      invalidatesTags: result => (!result ? [] : ['Payments'])
    })
  })
});

export const {
  useAddBillMutation,
  useGetBillsQuery,
  useDeleteBillMutation,
  useDisableBillMutation,
  useEditBillMutation,
  useGetPaymentsQuery,
  useUpdatePaymentMutation
} = paymentsApi;
