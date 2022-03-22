import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import CarService from "../services/CarService";
function AddCar() {
  //get car
  let { id } = useParams();
  async function getCar() {
    if (!id) {
      return;
    }
    const car = await CarService.get(id);
    setBrand(car.brand);
    setModel(car.model);
    setYear(car.year);
    setMaxSpeed(car.maxSpeed);
    setNumberOfDoors(car.numberOfDoors);
    setIsAutomatic(car.isAutomatic);
    setEngine(car.engine);
  }
  useEffect(() => {
    getCar();
  }, []);
  const history = useHistory();
  // fields
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(1990);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [numberOfDoors, setNumberOfDoors] = useState(0);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [engine, setEngine] = useState(null);
  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!id) {
      const newCar = await CarService.create({
        brand,
        model,
        year,
        maxSpeed,
        numberOfDoors,
        isAutomatic,
        engine,
      });
    } else {
      const newCar = await CarService.edit(id, {
        brand,
        model,
        year,
        maxSpeed,
        numberOfDoors,
        isAutomatic,
        engine,
      });
    }
    history.push("/cars");
  }
  const years = () => {
    let currentYear = new Date().getFullYear();
    let arr = [];
    for (let i = 1990; i <= currentYear; i++) arr.push(i);
    return arr;
  };
  const engines = ["diesel", "petrol", "electric", "hybrid"];
  // handle reset
  const handleReset = () => {
    setBrand("");
    setModel("");
    setYear(1990);
    setMaxSpeed("");
    setNumberOfDoors("");
    setIsAutomatic(false);
    setEngine("");
  };
  // handle preview
  const handlePreview = () => {
    const automaticCheck = isAutomatic
      ? "Car is automatic"
      : "Car is not automatic";
    alert(`brand:${brand}
           model:${model}
           year:${year}
           Maximum Speed:${maxSpeed}
           Number of Doors: ${numberOfDoors}
           ${automaticCheck}
           Engine: ${engine}`);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type='text'
            name='brand'
            required
            minLength='2'
            value={brand}
            placeholder='Brand'
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>
        <br />
        <label>
          <input
            type='text'
            name='model'
            required
            value={model}
            minLength='2'
            placeholder='Model'
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <br />
        <label>
          Select year:{" "}
          <select
            name='year'
            value={year}
            required
            onChange={(e) => setYear(e.target.value)}
          >
            {years().map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Maximum Speed: {""}
          <input
            type='number'
            name='maxSpeed'
            min='0'
            value={maxSpeed}
            placeholder='Maximum speed'
            onChange={(e) => setMaxSpeed(e.target.value)}
          />
        </label>
        <br />
        <label>
          Number of Doors:
          <input
            type='number'
            name='numberOfDoors'
            min='0'
            value={numberOfDoors}
            required
            placeholder='Number of Doors'
            onChange={(e) => setNumberOfDoors(e.target.value)}
          />
        </label>
        <br />
        <label>
          Is Automatic? :{" "}
          <input
            type='checkbox'
            name='isAutomatic'
            value={isAutomatic}
            checked={isAutomatic}
            onChange={() => setIsAutomatic(!isAutomatic)}
          />
        </label>
        <br />
        <label>
          <div>
            Choose an engine:{" "}
            {engines.map((item) => (
              <span key={item}>
                {item}{" "}
                <input
                  required
                  type='radio'
                  onChange={(e) => setEngine(e.target.value)}
                  name='engine'
                  checked={item == engine}
                  value={item}
                />{" "}
              </span>
            ))}
          </div>
        </label>
        <br />
        <button className='btn' type='submit'>
          Submit
        </button>
        <div>
          <button type='button' className='btn btn-light' onClick={handleReset}>
            Reset
          </button>
          <button
            type='button'
            className='btn btn-light'
            onClick={handlePreview}
          >
            Preview
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCar;
