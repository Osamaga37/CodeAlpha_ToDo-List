import "./App.css";
import Header from "./components/Header/Header";
import ToDo from "./components/ToDo/ToDo";
function App() {
  return (
    <div className=" container flex-col text-center flex justify-center mt-12 border-black">
      <Header />
      <ToDo />
    </div>
  );
}

export default App;
