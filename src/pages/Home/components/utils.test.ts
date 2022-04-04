import '@testing-library/jest-dom'

import { calculateAndFormatPriceForSingleMeal, calculateAndFormatTotalPrice } from './utils'
import { mealsData } from '../../../mealsdata'
 
describe('Helper functions for calculating order/orders price', () => {

  describe('Calculate and format price for single meal', () => {
    test('Given a meal without drink then the function should return correct price and format', () => {
      const { price, formattedPrice } = calculateAndFormatPriceForSingleMeal(mealsData.meals[3])

      expect(price).toEqual(mealsData.meals[3].price)
      expect(formattedPrice).toEqual(`${mealsData.meals[3].price} €`)
    })

    test('Given a meal with drink then the function should return correct price and format', () => {
      const { price, formattedPrice } = calculateAndFormatPriceForSingleMeal(mealsData.meals[4], mealsData.meals[4].drinks[2])

      expect(price).toEqual(mealsData.meals[4].price + mealsData.meals[4].drinks[2].price)
      expect(formattedPrice).toEqual(`${price.toFixed(2)} €`)
    })
  })


  describe('Calculate and format price for all selected meals', () => {
    test('Given a list of passengers and meals calculate then function should return correct total price and format', () => {
      const passengers = [
        {
          id: 1,
          age: 54,
          seat: 23,
          meal: {
            id: mealsData.meals[2].id,
            drinkId: mealsData.meals[2].drinks[1].id
          }
        },
        {
          id: 2,
          age: 12,
          seat: 24,
          meal: null
        },
        {
          id: 3,
          age:32,
          seat:77,
          meal: {
            id: mealsData.meals[4].id,
            drinkId: mealsData.meals[4].drinks[2].id
          }
        }
      ]

      const { totalPrice, formattedPrice } = calculateAndFormatTotalPrice({ passengers, meals: mealsData.meals })

      const firstPassengerMeal = mealsData.meals.find(meal => meal.id === passengers[0].meal!.id)!
      const firstPassengerDrink = firstPassengerMeal.drinks.find(drink => drink.id === passengers[0].meal!.drinkId)!
      const firstPassengerOrderPrice = firstPassengerMeal.price + firstPassengerDrink.price

      const thirdPassengerMeal = mealsData.meals.find(meal => meal.id === passengers[2].meal!.id)!
      const thirdPassengerDrink = thirdPassengerMeal.drinks.find(drink => drink.id === passengers[2].meal!.drinkId)!
      const thirdPassengerOrderPrice = thirdPassengerMeal.price + thirdPassengerDrink.price

      expect(totalPrice).toEqual(firstPassengerOrderPrice + thirdPassengerOrderPrice)
      expect(formattedPrice).toEqual(`${(firstPassengerOrderPrice + thirdPassengerOrderPrice).toFixed(2)} €`)
    })
  })

})
