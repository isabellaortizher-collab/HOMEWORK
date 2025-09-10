function imagen({ image }) {
  return (
    <div style={{ textAlign: "center", border: "1px solid #ddd", padding: "10px" }}>
      <h3>{image.title}</h3>
      <img src={image.url} alt={image.title} style={{ width: "200px", height: "300px" }} />
      <p>ID: {image.id}</p>
    </div>
  );
}

export default imagen;
