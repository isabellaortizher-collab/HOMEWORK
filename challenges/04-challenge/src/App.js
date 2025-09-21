import { useState } from "react";
import Child from "./Child";

function App () {
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const handleInputChange = (e) => {
    setCategory(e.target.value);

  };
  const handleAddCategory = () => {
    if(category.trim()=== "") return;

    setCategories([...categories, category]);
    setCategory("");
  }
  return(
    <div>
      <h1>Challenge 04</h1>
      <input type="text" value={category} onChange={handleInputChange} placeholder="Escribe una categoria" />
      <button onClick={handleAddCategory}>Agregar</button>
      <Child categories = {categories}/>
    </div>
  )
}
export default App;


