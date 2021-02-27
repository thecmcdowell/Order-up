// NOTE: this is because normally there would be API stuff

const mockData = [
  {
    title: "Jacks Everything Burger",
    price: 5.99,
    description: "Tasty burger with everything on it",
  },
  {
    title: "Spicy Curry Chicken",
    price: 8.99,
    description: "Best Curry this side of town",
  },
  {
    title: "BBQ Chicken",
    price: 10.0,
    description: "A full bird",
  },
  {
    title: "Mac-n-cheese",
    price: 2.99,
    description: "the side of all side's",
  },
  {
    title: "Collard Greens",
    price: 5.99,
    description: "You just can't go wrong with these",
  },
  {
    title: "Extra Sauce",
    price: 0.25,
    description: "You know you want more",
  },
  {
    title: "Large Drink",
    price: 1.99,
    description: "Quench your thirst",
  },
  {
    title: "Fries",
    price: 4.87,
    description: "Side of fries",
  },
  {
    title: "Lobster",
    price: 19.99,
    description: "Fresh from the store",
  },
  {
    title: "Catfish",
    price: 14.99,
    description: "The best fish there is",
  },
  {
    title: "Alfredo Pasta",
    price: 9.87,
    description: "Pasta, what's not to love",
  },
  {
    error: "this is a pre-calculated error",
  },
];

const getFood = () => {
  return mockData;
};

export default getFood;
