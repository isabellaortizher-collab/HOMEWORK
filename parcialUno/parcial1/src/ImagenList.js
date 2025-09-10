import Imagen from "./Imagen";

function ImageList({ images }) {
  if (images.length === 0) {
    return <p>No hay imágenes para mostrar</p>;
  }

  return (
    <div>
      {images.map((img) => (
        <Imagen key={img.id} image={img} />
      ))}
    </div>
  );
}

export default ImageList;
