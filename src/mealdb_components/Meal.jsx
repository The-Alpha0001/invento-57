import { Card, Spinner } from "flowbite-react";
import { useState } from "react";

function getIngredientImageUrl(ingredient) {
  return `https://www.themealdb.com/images/ingredients/${encodeURIComponent(ingredient)}-Small.png`;
}

const Meal = ({ error, loading, meals }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const totalPages = Math.ceil(meals.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-12 text-stone-600">
        <Spinner aria-label="Loading ingredients" />
        <span>Loading ingredients...</span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-center text-red-800" role="alert">
        {error}
      </p>
    );
  }

  if (meals.length === 0) {
    return (
      <p className="py-10 text-center text-stone-600" role="status">
        No ingredients were found.
      </p>
    );
  }

  return (
    <div>
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {meals.slice(startIndex, startIndex + pageSize).map((meal) => (
          <Card
            key={meal.strIngredient}
            className="overflow-hidden border-stone-200 bg-white p-0 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-orange-50">
              <span
                aria-hidden="true"
                className="absolute text-4xl text-orange-300"
              >
                ✦
              </span>
              <img
                src={meal.strThumb || getIngredientImageUrl(meal.strIngredient)}
                alt={meal.strIngredient}
                loading="lazy"
                className="relative z-10 h-full w-full object-contain p-4"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />
            </div>
            <div className="px-4 pb-4 pt-1">
              <h3 className="font-semibold capitalize text-stone-800">
                {meal.strIngredient}
              </h3>
              <p className="mt-2 whitespace-pre-line text-left text-sm leading-6 text-stone-600">
                {meal.strDescription?.trim() || "No description is available."}
              </p>
            </div>
          </Card>
        ))}
      </div>
      {totalPages > 1 && (
        <nav
          aria-label="Ingredient pages"
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
            className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>
          <p className="text-sm text-stone-600" aria-live="polite">
            Showing {startIndex + 1}–{Math.min(startIndex + pageSize, meals.length)} of{" "}
            {meals.length} ingredients · Page {currentPage} of {totalPages}
          </p>
          <button
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
            className="rounded-full border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-700 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
};

export default Meal;
