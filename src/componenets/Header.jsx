import { useContext, useEffect } from "react";
import ProductContext from "../context/ProductContext";

const Header = () => {
  const context = useContext(ProductContext);

  if (context === null) {
    throw new Error("Header must be used inside a ProductProvider.");
  }

  const { products } = context;
  const totalQuantity = products.reduce(
    (total, product) => total + product.quantity,
    0,
  );

  useEffect(() => {
    document.title = `Invento | ${totalQuantity} items in stock`;
  }, [totalQuantity]);

  return (
    <header className="border-b border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 sm:px-8">
        <a href="/" className="flex items-center gap-3 text-black">
          <span className="flex size-10 items-center justify-center rounded-xl bg-black text-lg font-bold text-white">
            I
          </span>
          <span>
            <span className="block text-lg font-bold leading-tight tracking-tight">
              Invento <span className="text-black/50">App</span>
            </span>
            <span className="mt-1 block text-xs font-medium uppercase tracking-[0.16em] text-black/50">
              Inventory
            </span>
          </span>
        </a>
        <div
          className="flex items-center gap-2 rounded-full border border-black/10 px-3 py-2 text-sm text-black sm:px-4"
          aria-label={`${products.length} products in inventory, ${totalQuantity} items in stock`}
        >
          <span className="size-2 rounded-full bg-black" aria-hidden="true" />
          <span className="hidden text-black/60 sm:inline">
            Items in stock
          </span>
          <span className="font-semibold tabular-nums">{totalQuantity}</span>
        </div>
      </div>
    </header>
  )
}

export default Header