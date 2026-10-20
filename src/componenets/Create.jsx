
import { useState } from "react";
import useProducts from "../hooks/useProducts";

const Create = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { addProduct } = useProducts();

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("productName").trim();
    const quantity = Number(formData.get("quantity"));

    if (!name || !Number.isInteger(quantity) || quantity < 0) {
      setError("Enter a product name and a whole-number quantity of zero or more.");
      setSuccess("");
      return;
    }

    addProduct({ name, quantity });
    form.reset();
    setError("");
    setSuccess(`${name} was added to your inventory.`);
  }

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-5 py-12 sm:px-8 sm:py-16">
      <div className="mb-8 max-w-2xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/50">
          Inventory management
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-black sm:text-4xl">
          Keep your stock in order.
        </h1>
        <p className="mt-3 text-base leading-7 text-black/60">
          Add products and keep the details of your inventory close at hand.
        </p>
      </div>
      <section
        aria-labelledby="add-product-heading"
        className="max-w-2xl rounded-2xl border border-black/10 bg-white p-6 sm:p-8"
      >
        <div className="mb-7 flex items-start justify-between gap-4">
          <div>
            <h2
              id="add-product-heading"
              className="text-xl font-semibold tracking-tight text-black"
            >
              Add a product
            </h2>
            <p className="mt-1 text-sm text-black/55">
              Enter the product details below.
            </p>
          </div>
          <span className="rounded-full bg-black px-3 py-1 text-xs font-medium text-white">
            New item
          </span>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-[minmax(0,1fr)_10rem]">
            <div>
              <label
                htmlFor="product-name"
                className="mb-2 block text-sm font-medium text-black"
              >
                Product name
              </label>
              <input
                id="product-name"
                name="productName"
                type="text"
                placeholder="e.g. Wireless keyboard"
                autoComplete="off"
                maxLength={100}
                required
                className="block w-full rounded-lg border border-black/15 bg-white px-3.5 py-3 text-sm text-black placeholder:text-black/35 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
            <div>
              <label
                htmlFor="product-quantity"
                className="mb-2 block text-sm font-medium text-black"
              >
                Quantity
              </label>
              <input
                id="product-quantity"
                name="quantity"
                type="number"
                placeholder="e.g. 12"
                min="0"
                step="1"
                required
                className="block w-full rounded-lg border border-black/15 bg-white px-3.5 py-3 text-sm text-black placeholder:text-black/35 focus:border-black focus:outline-none focus:ring-2 focus:ring-black/10"
              />
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center rounded-lg bg-black px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-black/80 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 sm:w-auto"
          >
            Add product
            <span className="ml-2 text-base leading-none" aria-hidden="true">
              +
            </span>
          </button>
          {(error || success) && (
            <p
              className={`text-sm ${error ? "text-red-700" : "text-green-700"}`}
              role={error ? "alert" : "status"}
            >
              {error || success}
            </p>
          )}
        </form>
      </section>
    </main>
  )
}

export default Create