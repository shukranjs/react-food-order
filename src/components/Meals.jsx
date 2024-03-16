import { useState, useEffect } from "react";
import MealItem from "./MealItem";
export default function Meals() {
  const [loadedmeals, setLoadedMeals] = useState([]);

  useEffect(() => {
    async function fetchMeals() {
      const response = await fetch("http://localhost:3000/meals");

      if (!response.ok) {
      }
      const meals = await response.json();
      setLoadedMeals(meals);
    }
    fetchMeals();
  }, []);

  return (
    <ul id="meals">
      {" "}
      {loadedmeals.map((meal) => (
        <MealItem meal={meal} />
      ))}
    </ul>
  );
}
