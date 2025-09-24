import { useState } from "react";
import ImagenList from "./ImagenList";
import ImagenAdd from "./ImagenAdd";

function App() {
  const [images, setImages] = useState([]);
  const [filter, setFilter] = useState("");

  const addImage = (id, title) => {
    const newImage = {
      id,
      title,
      url: `https://picsum.photos/id/${id}/200/300`,
    };
    setImages([...images, newImage]);
  };

  const filteredImages = images.filter((img) =>
    img.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Parcial 1 - Lista de imágenes</h1>

      <ImagenAdd addImage={addImage} />

      <div>
        <input type="text" placeholder="Buscar por título..." value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <ImagenList images={filteredImages} />
    </div>
  );
}

export default App;
