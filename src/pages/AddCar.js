import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory, useParams } from "react-router-dom";
import CarService from "../services/CarService";
function AddCar() {
  // fields
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(1990);
  const [max_speed, setMaxSpeed] = useState(0);
  const [number_of_doors, setNumberOfDoors] = useState(0);
  const [is_automatic, setIsAutomatic] = useState(false);
  const [engine, setEngine] = useState(null);
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
    setMaxSpeed(car.max_speed);
    setNumberOfDoors(car.number_of_doors);
    setIsAutomatic(car.is_automatic);
    setEngine(car.engine);
  }
  useEffect(() => {
    getCar();
  }, []);
  const history = useHistory();
  // handle submit
  async function handleSubmit(e) {
    e.preventDefault();
    if (!id) {
      try {
        await CarService.create({
          brand,
          model,
          year,
          max_speed,
          number_of_doors,
          is_automatic,
          engine,
        });
      } catch (error) {
        const errors = [];
        Object.values(error.response.data.errors).map((error) =>
          errors.push(error)
        );
        alert(errors.map((error) => `${error} \n`));

        return;
      }
    } else {
      await CarService.edit(id, {
        brand,
        model,
        year,
        max_speed,
        number_of_doors,
        is_automatic,
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
    const automaticCheck = is_automatic
      ? "Car is automatic"
      : "Car is not automatic";
    alert(`brand:${brand}
           model:${model}
           year:${year}
           Maximum Speed:${max_speed}
           Number of Doors: ${number_of_doors}
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
            name='max_speed'
            value={max_speed}
            placeholder='Maximum speed'
            onChange={(e) => setMaxSpeed(e.target.value)}
          />
        </label>
        <br />
        <label>
          Number of Doors:
          <input
            type='number'
            name='number_of_doors'
            value={number_of_doors}
            placeholder='Number of Doors'
            onChange={(e) => setNumberOfDoors(e.target.value)}
          />
        </label>
        <br />
        <label>
          Is Automatic? :{" "}
          <input
            type='checkbox'
            name='is_automatic'
            value={is_automatic}
            checked={is_automatic}
            onChange={() => setIsAutomatic(!is_automatic)}
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
