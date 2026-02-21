import { useState } from "react";

function ImagenAdd({ addImage }) {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");

  const handleAddImage = () => {
    if (!id || !title) return alert("Debes ingresar un ID y un título");
    addImage(id, title);
    setId("");
    setTitle("");
  };

  return (
    <div>
      <input type="number" placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <input type="text" placeholder="Título de imagen" value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={handleAddImage}>Agregar</button>
    </div>
  );
}
export default ImagenAdd;
