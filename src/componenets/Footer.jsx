
const Footer = () => {
  return (
    <footer className="border-t border-black/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p className="font-semibold tracking-tight text-black">Invento</p>
        <p className="text-black/50">
          A simpler way to stay on top of your stock.
        </p>
        <p className="text-xs text-black/45">
          &copy; {new Date().getFullYear()} Invento. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer