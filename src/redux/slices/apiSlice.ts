import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Meal } from '../../types'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getMealList: builder.query<Array<Meal>, void>({
      query: () => '/v1/meals',
    }),
  }),
})

export const { useGetMealListQuery } = apiSlice
