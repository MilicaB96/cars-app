import React, { useState, useEffect } from "react";
import CarService from "../services/CarService";
function AppCars() {
  const [cars, setCars] = useState([]);
  async function getCars() {
    const data = await CarService.getAll();
    setCars(data);
  }
  useEffect(() => {
    getCars();
  }, []);
  return (
    <div>
      <h1>Cars:</h1>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.brand} ({car.model})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AppCars;
