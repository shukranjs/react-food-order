import MealItem from "./MealItem";
import useHttp from "../hooks/useHttp";

const requestConfig = {};
export default function Meals() {
  const { data: loadedMeals, isLoading, error } = useHttp(
    "http://localhost:3000/meals",
    requestConfig,
    []
  );
  console.log(isLoading, "sssss");

  if (isLoading) {
    return <p>Fetching meals...</p>;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}
