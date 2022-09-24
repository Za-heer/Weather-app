import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";

const Weather = () => {
  const [inputValue, setinputValue] = useState("karachi");
  const [callApi, setcallApi] = useState(false);
  const [userinfo, setUserinfo] = useState("");
  const [error, setError] = useState("");

  useEffect(()=>{
    axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=8b334bdd5240084ad5d8b64e66a6fec4&units=metric`
      )

    .then((res)=>{
      setUserinfo(res.data);
      setError(false);
    })

    .catch((err)=>{
      console.log(err);
      setError(true);
    })
  },[callApi])

  const handler = (e) => {
    e.preventDefault();
    console.log(inputValue);

    if (!inputValue) {
      console.log("No data found");
      return;
    }

    setcallApi(!callApi);
  };
  return (
    <>
      <section className="vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <h3 className="mb-4 pb-2 fw-normal">
                Check the weather forecast
              </h3>
              <form onSubmit={handler}>
                <div className="input-group rounded mb-3">
                  <input
                    onChange={(e) => {
                      setinputValue(e.target.value);
                    }}
                    value={inputValue}
                    type="search"
                    className="form-control rounded"
                    placeholder="City"
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                </div>
              </form>
              <div className="mb-4 pb-2">
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    defaultValue="option1"
                    defaultChecked="true"
                  />
                  <label className="form-check-label" htmlFor="inlineRadio1">
                    Celsius
                  </label>
                </div>
              </div>
              <div className="card shadow-0 border">
                <div className="card-body p-4">
                  <h4 className="mb-1 sfw-normal">{userinfo ? userinfo.name : "City Name"}</h4>
                  <p className="mb-2">
                    Current temperature: <strong>{userinfo ? userinfo.main.temp : "Temperature"}°C</strong>
                  </p>
                  <p>
                    Feels like: <strong>{userinfo ? userinfo.main.feels_like : "Feel-Like Temperature"}°C</strong>
                  </p>
                  <p>
                    Max: <strong>{userinfo ? userinfo.main.temp_max : "Max Temperature"}°C</strong>,
                    Min: <strong>{userinfo ? userinfo.main.temp_min : "Min Temperature"}°C</strong>
                  </p>
                  <div>
                    <p className="mb-0 me-4">{userinfo ? userinfo.weather[0].description : "Description"}</p>
                    <i
                      className="fas fa-cloud fa-3x"
                      style={{ color: "#eee" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Weather;
