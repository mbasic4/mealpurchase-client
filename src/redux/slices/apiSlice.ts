import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Meal, MealCategory } from '../../types'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    getMealList: builder.query<Array<Meal>, void>({
      query: () => '/v1/meals',
    }),
    getMealCategories: builder.query<Array<MealCategory>, void>({
      query: () => '/v1/meal-categories',
    }),
  }),
})

export const { useGetMealListQuery, useGetMealCategoriesQuery } = apiSlice
