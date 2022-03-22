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
  // prompt
  // handle Delete
  async function handleDelete(id) {
    let message = prompt("Are you sure you want to delete this(Y/N)", "Y");
    if (message !== "Y") {
      return;
    }
    const data = await CarService.delete(id);
    const index = cars.findIndex((car) => car.id == id);
    if (data.count > 0) {
      setCars([...cars.slice(0, index), ...cars.slice(index + 1)]);
    }
  }
  return (
    <div>
      <h1>Cars:</h1>
      <ul>
        {cars.map((car) => (
          <div key={car.id}>
            <li className='d-inline-block' key={car.id}>
              <div>
                <span>
                  {car.brand} ({car.model},{car.year}){" "}
                </span>
                <span>
                  {car.maxSpeed ? `Maximum speed is ${car.maxSpeed}` : ``}{" "}
                </span>
                <span>Number of doors:{car.numberOfDoors} </span>
                <span>The engine is: {car.engine} </span>
                <span>
                  Car is {car.isAutomatic ? "Automatic" : "not Automatic"}
                </span>
              </div>
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
