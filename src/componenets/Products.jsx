import { useState } from "react";
import useProducts from "../hooks/useProducts";

const Products = () => {
  const [editingId, setEditingId] = useState(null);
  const [editError, setEditError] = useState("");
  const { products, updateProduct, deleteProduct } = useProducts();

  function handleEditSubmit(event, id) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get("productName").trim();
    const quantity = Number(formData.get("quantity"));

    if (!name || !Number.isInteger(quantity) || quantity < 0) {
      setEditError("Enter a product name and a whole-number quantity of zero or more.");
      return;
    }

    updateProduct({ id, name, quantity });
    setEditingId(null);
    setEditError("");
  }

  return (
    <section
      aria-labelledby="products-heading"
      className="mx-auto w-full max-w-6xl px-5 pb-12 sm:px-8"
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <div>
          <h2
            id="products-heading"
            className="text-xl font-semibold tracking-tight text-black"
          >
            Products inventory
          </h2>
          <p className="mt-1 text-sm text-black/55">
            {products.length} {products.length === 1 ? "product" : "products"}
          </p>
        </div>
      </div>
      <div className="overflow-x-auto rounded-xl border border-black/10">
        <table className="w-full min-w-[32rem] divide-y divide-black/10 text-left text-sm">
          <thead className="bg-black/[0.03] text-xs uppercase tracking-wider text-black/55">
            <tr>
              <th scope="col" className="px-5 py-3 font-medium">
                S/N
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Product name
              </th>
              <th scope="col" className="px-5 py-3 font-medium">
                Quantity
              </th>
              <th scope="col" className="px-5 py-3 text-right font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/10 bg-white">

            {products.length === 0 ? (
              <tr>
                <td
                  className="px-5 py-10 text-center text-sm text-black/55"
                  colSpan={4}
                >
                  No products yet. Add a product above to get started.
                </td>
              </tr>
            ) : (
              products.map((product, index) => (
                <tr key={product.id} className="text-black">
                  <td className="px-5 py-4 tabular-nums text-black/50">
                    {index + 1}
                  </td>
                  {editingId === product.id ? (
                    <>
                      <td className="px-5 py-4">
                        <form
                          id={`edit-product-${product.id}`}
                          onSubmit={(event) => handleEditSubmit(event, product.id)}
                        />
                        <label className="sr-only" htmlFor={`name-${product.id}`}>
                          Product name
                        </label>
                        <input
                          id={`name-${product.id}`}
                          form={`edit-product-${product.id}`}
                          name="productName"
                          type="text"
                          defaultValue={product.name}
                          maxLength={100}
                          required
                          className="min-w-40 rounded-lg border border-black/15 px-3 py-2"
                        />
                        {editError && (
                          <p className="mt-2 text-xs text-red-700" role="alert">
                            {editError}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-4 tabular-nums">
                        <label
                          className="sr-only"
                          htmlFor={`quantity-${product.id}`}
                        >
                          Quantity
                        </label>
                        <input
                          id={`quantity-${product.id}`}
                          form={`edit-product-${product.id}`}
                          name="quantity"
                          type="number"
                          defaultValue={product.quantity}
                          min="0"
                          step="1"
                          required
                          className="w-24 rounded-lg border border-black/15 px-3 py-2"
                        />
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="px-5 py-4 font-medium">{product.name}</td>
                      <td className="px-5 py-4 tabular-nums">
                        {product.quantity}
                      </td>
                    </>
                  )}
                  <td className="px-5 py-4 text-right">
                    <div className="inline-flex flex-wrap justify-end gap-2">
                      {editingId === product.id ? (
                        <>
                          <button
                            form={`edit-product-${product.id}`}
                            type="submit"
                            className="rounded-lg bg-black px-3 py-2 text-xs font-semibold text-white hover:bg-black/80"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingId(null);
                              setEditError("");
                            }}
                            className="rounded-lg border border-black/15 px-3 py-2 text-xs font-semibold text-black/65"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(product.id);
                            setEditError("");
                          }}
                          className="rounded-lg border border-black/15 px-3 py-2 text-xs font-semibold text-black/65 hover:bg-black/[0.03]"
                          aria-label={`Edit ${product.name}`}
                        >
                          Edit
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => deleteProduct(product.id)}
                        className="rounded-lg border border-black/15 px-3 py-2 text-xs font-semibold text-black/65 hover:bg-black/[0.03]"
                        aria-label={`Delete ${product.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
export default Products