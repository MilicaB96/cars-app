import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CarService from "../services/CarService";

function SingleCar() {
  const { id } = useParams();
  const [car, setCar] = useState("");
  async function fetchCar() {
    const data = await CarService.get(id);
    setCar(data);
  }
  useEffect(() => {
    fetchCar();
  }, []);
  return (
    <div>
      <h1>{car.brand}</h1>
      <span>
        ({car.model},{car.year}){" "}
      </span>
      <span>{car.maxSpeed ? `Maximum speed is ${car.maxSpeed}` : ``} </span>
      <span>Number of doors:{car.numberOfDoors} </span>
      <span>The engine is: {car.engine} </span>
      <span>Car is {car.isAutomatic ? "Automatic" : "not Automatic"}</span>
    </div>
  );
}

export default SingleCar;
