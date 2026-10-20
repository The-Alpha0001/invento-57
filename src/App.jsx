import Header from "./componenets/Header";
import Create from "./componenets/Create";
import Products from "./componenets/Products";
import Footer from "./componenets/Footer";


const App = () => {


  return (
    <div className="flex min-h-screen flex-col bg-white text-black">
      <Header />
      <Create />
      <Products />
      <Footer />
    </div>
  );
};

export default App;