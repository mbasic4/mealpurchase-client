import { Passenger } from "../../../redux/slices/passengerSlice"
import { Drink, Meal } from "../../../types"

interface MealAndDrinkArgs {
  passenger: Passenger
  meals: Array<Meal>
}

export function getSelectedMealAndDrink ({ passenger, meals }: MealAndDrinkArgs) {
  let selectedMeal
  let selectedDrink
  if (passenger.meal) {
    const { id, drinkId } = passenger.meal
    if (id) {
      selectedMeal = meals.find(meal => meal.id === id)
    }
    if (selectedMeal && drinkId) {
      selectedDrink = selectedMeal.drinks.find(drink => drink.id === drinkId)
    }
  }

  return { selectedMeal, selectedDrink }
}

export function calculateAndFormatPriceForSingleMeal (meal: Meal, drink?: Drink) {
  let price = meal.price
  if (drink && drink.price) {
    price += drink.price
  }
  
  return { price, formattedPrice: `${price.toFixed(2)} €` }
}

interface CalculateTotalPriceArgs {
  passengers: Array<Passenger>
  meals: Array<Meal>
}

export function calculateAndFormatTotalPrice ({ passengers, meals }: CalculateTotalPriceArgs) {
  let totalPrice = 0
  for (const passenger of passengers) {
    if (passenger.meal) {
      const meal = meals.find(meal => meal.id === passenger.meal!.id)
      const drink = meal?.drinks.find(drink => drink.id === passenger.meal!.drinkId)

      const { price } = calculateAndFormatPriceForSingleMeal(meal as Meal, drink)
      totalPrice += price
    }
  }

  return { totalPrice, formattedPrice: `${totalPrice.toFixed(2)} €` }
}