import React, { useState, useEffect } from "react";
import CarService from "../services/CarService";
import { Link, useHistory } from "react-router-dom";
function AppCars() {
  const [cars, setCars] = useState([]);
  async function getCars() {
    const data = await CarService.getAll();
    setCars(data.data);
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
    await CarService.delete(id);
    const index = cars.findIndex((car) => car.id == id);

    setCars(cars.filter((car) => car.id !== id));
  }
  return (
    <div>
      <h1>Cars:</h1>
      <ul>
        {Boolean(cars.length) &&
          cars.map((car) => (
            <div key={car.id}>
              <li className='d-inline-block' key={car.id}>
                <div>
                  <Link to={`/cars/${car.id}`}>{car.brand}</Link>
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
