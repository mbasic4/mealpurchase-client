import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Meal, MealCategory } from '../../types'

interface QueryParams {
  limit?: number
  page?: number
  mealCategoryId?: string
  mealIds?: Array<string | undefined>
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    mealList: builder.query<{ data: Array<Meal>, totalCount: number }, QueryParams | void>({
      query: (args: QueryParams | void) => {
        let path = '/v1/meals'

        if (!args) {
          return path
        }
        if (args.mealIds) {
          return `${path}?mealIds=${args.mealIds}`
        } else {
          const { limit, page, mealCategoryId } = args
          path = `${path}?limit=${limit}&page=${page}`

          if (mealCategoryId) {
            path = `${path}&mealCategoryId=${mealCategoryId}`
          }

          return path
        }
      }
    }),
    mealCategories: builder.query<Array<MealCategory>, void>({
      query: () => '/v1/meal-categories',
    }),
  }),
})

export const { useMealListQuery, useMealCategoriesQuery } = apiSlice
