export interface MealsData {
  labels: Array<{
    id: string,
    label: string
  }>
  meals: Array<Meal>
}

export interface Meal {
  id: string
  title: string
  starter: string
  desert: string
  price: number
  labels: Array<string>
  img: string
  drinks: Array<Drink>
}

export interface Drink {
  id: string
  title: string
  price: number
}