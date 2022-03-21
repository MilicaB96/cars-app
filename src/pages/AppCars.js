import React, { useState, useEffect } from "react";
import CarService from "../services/CarService";
function AppCars() {
  const [cars, setCars] = useState([]);
  async function getCars() {
    const data = await CarService.getAll();
    console.log(data);
    setCars(data);
  }
  useEffect(() => {
    getCars();
  }, []);
  return (
    <div>
      <h1>Cars:</h1>
      <ul>
        {cars.map((car) => {
          <li>{car}</li>;
        })}
      </ul>
    </div>
  );
}

export default AppCars;
