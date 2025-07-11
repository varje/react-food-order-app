export default function Meals({ title, meals, fallbackText, onSelectMeal }) {
  return (
    <section className="center">
      <h1>{title}</h1>
      {meals.length === 0 && <p className="fallback-text">{fallbackText}</p>}
      {meals.length > 0 && (
        <ul id="meals">
          {meals.map((meal) => (
            <li key={meal.id} className="meal-item">
              <article>
                <img
                  src={`http://localhost:3000/${meal.image}`}
                  alt={meal.name}
                />
                <h3>{meal.name}</h3>
                <p className="meal-item-description">{meal.description}</p>
                <p className="meal-item-price">${meal.price}</p>
                <button
                  className="button meal-item-actions"
                  onClick={() => onSelectMeal(meal)}
                >
                  Add to cart
                </button>
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
