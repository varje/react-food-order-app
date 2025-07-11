import Meals from "./Meals.jsx";
import { useState, useEffect } from "react";

export default function AvailableMeals({ onSelectMeal }) {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/meals")
      .then((res) => res.json())
      .then((data) => {
        setMeals(data);
        setIsLoading(false);
      })
      .catch(() => {
        setMeals([]);
        setIsLoading(false);
      });
  }, []);
  return (
    <Meals
      title="Available Meals"
      meals={meals}
      fallbackText="No meals available."
      onSelectMeal={onSelectMeal}
    />
  );
}
