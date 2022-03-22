import React, { useState, useEffect } from "react";
import CarService from "../services/CarService";
import { useHistory } from "react-router-dom";
function AppCars() {
  const [cars, setCars] = useState([]);
  async function getCars() {
    const data = await CarService.getAll();
    setCars(data);
  }
  useEffect(() => {
    getCars();
  }, []);
  let history = useHistory();
  // handle Delete
  async function handleDelete(id) {
    const deleteCar = await CarService.delete(id);
    getCars();
  }
  return (
    <div>
      <h1>Cars:</h1>
      <ul>
        {cars.map((car) => (
          <div key={car.id}>
            <li className='d-inline-block' key={car.id}>
              {car.brand} ({car.model},{car.year}) {car.maxSpeed}{" "}
              {car.numberOfDoors} {car.engine}{" "}
              {car.isAutomatic ? "Automatic" : "Not Automatic"}
            </li>
            <button
              type='button'
              className='btn'
              onClick={() => history.push(`/edit/${car.id}`)}
            >
              Edit
            </button>
            <button
              type='button'
              className='btn'
              onClick={() => {
                handleDelete(car.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default AppCars;
