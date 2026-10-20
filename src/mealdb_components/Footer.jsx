const Footer = () => {
  return (
    <footer className="border-t border-stone-800 bg-stone-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <a
          href="#home"
          className="font-bold tracking-tight text-white transition hover:text-orange-300"
        >
          MealDB
        </a>
        <p className="text-stone-400">
          Made for curious cooks and good company.
        </p>
        <p className="text-xs text-stone-500">
          &copy; {new Date().getFullYear()} MealDB
        </p>
      </div>
    </footer>
  );
};

export default Footer;