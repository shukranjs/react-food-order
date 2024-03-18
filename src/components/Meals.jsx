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
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    <Error title="Failed to fetch data!" message={error}></Error>;
  }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem meal={meal} key={meal.id} />
      ))}
    </ul>
  );
}
