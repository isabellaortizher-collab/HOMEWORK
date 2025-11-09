import React, { useState, useRef, useEffect } from "react";
import * as d3 from "d3";

export default function GraphFriendsCities() {
  const svgRef = useRef();

  const [cities, setCities] = useState([
    { id: "city-1", name: "Medellín" },
    { id: "city-2", name: "Bogotá" },
  ]);

  const [people, setPeople] = useState([
    { id: "p-1", name: "Ana", age: 25, cityId: "city-1" },
    { id: "p-2", name: "Luis", age: 30, cityId: "city-2" },
    { id: "p-3", name: "María", age: 22, cityId: "city-1" },
  ]);

  const [newCity, setNewCity] = useState("");
  const [newPerson, setNewPerson] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newCityId, setNewCityId] = useState("city-1");
  const [filterCity, setFilterCity] = useState("city-1");

  const nodes = [
    ...cities.map((c) => ({ id: c.id, name: c.name, type: "city" })),
    ...people.map((p) => ({
      id: p.id,
      name: `${p.name} (${p.age})`,
      type: "person",
    })),
  ];

  const links = people.map((p) => ({ source: p.id, target: p.cityId }));

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 700;
    const height = 500;

    const simulation = d3
      .forceSimulation(nodes)
      .force(
        "link",
        d3.forceLink(links).id((d) => d.id).distance(120)
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg
      .append("g")
      .attr("stroke", "#aaa")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke-width", 1.5);

    const node = svg
      .append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d) => (d.type === "city" ? 20 : 12))
      .attr("fill", (d) => (d.type === "city" ? "#0077cc" : "#ff8800"))
      .call(
        d3
          .drag()
          .on("start", (event, d) => {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (event, d) => {
            d.fx = event.x;
            d.fy = event.y;
          })
          .on("end", (event, d) => {
            if (!event.active) simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    const label = svg
      .append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d) => d.name)
      .attr("font-size", 10)
      .attr("dy", -20)
      .attr("text-anchor", "middle");

    // zoom y pan
    const container = svg.append("g");
    container.node().appendChild(link.node());
    svg.call(
      d3
        .zoom()
        .scaleExtent([0.5, 2])
        .on("zoom", (event) => {
          svg.selectAll("g").attr("transform", event.transform);
        })
    );

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => d.source.x)
        .attr("y1", (d) => d.source.y)
        .attr("x2", (d) => d.target.x)
        .attr("y2", (d) => d.target.y);

      node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
      label.attr("x", (d) => d.x).attr("y", (d) => d.y);
    });
  }, [cities, people]);

  const addCity = (e) => {
    e.preventDefault();
    if (!newCity.trim()) return;
    const id = `city-${Date.now()}`;
    setCities([...cities, { id, name: newCity }]);
    setNewCity("");
  };

  const addPerson = (e) => {
    e.preventDefault();
    if (!newPerson.trim() || !newAge.trim()) return;
    const id = `p-${Date.now()}`;
    setPeople([
      ...people,
      { id, name: newPerson, age: parseInt(newAge), cityId: newCityId },
    ]);
    setNewPerson("");
    setNewAge("");
  };

  const peopleInCity = people.filter((p) => p.cityId === filterCity);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Challenge 16 — Grafo de Amigos y Ciudades (D3.js + Vite)</h2>

      <form onSubmit={addCity} style={{ marginBottom: "10px" }}>
        <input
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
          placeholder="Nueva ciudad"
        />
        <button type="submit">Agregar ciudad</button>
      </form>

      <form onSubmit={addPerson} style={{ marginBottom: "10px" }}>
        <input
          value={newPerson}
          onChange={(e) => setNewPerson(e.target.value)}
          placeholder="Nombre"
        />
        <input
          type="number"
          value={newAge}
          onChange={(e) => setNewAge(e.target.value)}
          placeholder="Edad"
        />
        <select
          value={newCityId}
          onChange={(e) => setNewCityId(e.target.value)}
        >
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit">Agregar persona</button>
      </form>

      <div style={{ marginBottom: "1rem" }}>
        <label>Personas en: </label>
        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
        >
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <ul>
          {peopleInCity.map((p) => (
            <li key={p.id}>
              {p.name} ({p.age} años)
            </li>
          ))}
        </ul>
      </div>

      <svg ref={svgRef} width={700} height={500} style={{ border: "1px solid #ccc" }} />
    </div>
  );
}
