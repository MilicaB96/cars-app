import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import CarService from "../services/CarService";
function AddCar() {
  //
  const history = useHistory();
  // fields
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(1990);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [numberOfDoors, setNumberOfDoors] = useState(0);
  const [isAutomatic, setIsAutomatic] = useState(false);
  const [engine, setEngine] = useState(null);
  // create a car

  function createCar() {
    CarService.create({
      brand,
      model,
      year,
      maxSpeed,
      numberOfDoors,
      isAutomatic,
      engine,
    });
  }
  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    createCar();
    history.push("/cars");
  };
  const years = () => {
    let arr = [];
    for (let i = 1990; i <= 2018; i++) arr.push(i);
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
            value={numberOfDoors}
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
          <div onChange={(e) => setEngine(e.target.value)}>
            Choose an engine:{" "}
            {engines.map((engine) => (
              <span key={engine}>
                {engine}{" "}
                <input required type='radio' name='engine' value={engine} />{" "}
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
