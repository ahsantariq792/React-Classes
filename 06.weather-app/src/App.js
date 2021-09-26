import './App.css';
import { useState, useEffect } from "react"
import axios from 'axios';



const App = () => {
  const [isBright, setIsBright] = useState(false)
  const [weather, setWeather] = useState(null)
  const [search, setSearch] = useState("karachi")

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=363a0329911c1b074081245aae1023c3&units=metric`)
      .then(res => {
        const newWeather = res.data;
        console.log(newWeather);
        setWeather(newWeather);

      })


  }, [search]);

  const handlechange = () => {
    setIsBright(!isBright);

  };


  var x = document.getElementById("demo");

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {
  var x = document.getElementById("demo");
    x.innerHTML = "Latitude: " + position.coords.latitude + " | " +
      "Longitude: " + position.coords.longitude;
    console.log("ok")
  }
  getLocation()




  return (
    <>
      <div className="interface">

        <div className={(isBright) ? "Bright" : "Dark"}>

          <div className="mode">
            <button className="changeMode" onClick={handlechange}>{isBright ? "Dark" : "Bright"} Theme</button>
          </div>


          <div className="main-box">
          <h1 className="head">Today's Weather</h1>
            <div className="location"> 
            <h3> Your Location: </h3>
            <p id="demo">location</p>
            </div>
            <input type="search" id="search" placeholder="Enter City..." onChange={(event) => { setSearch(event.target.value) }} />


            <hr />



            {
              (!weather) ?
                (
                  <h1>Loading...</h1>) :
                (
                  <>

                    <div>


                    </div>
                    <div className="data">
                      <h2 className="city">{weather?.name}</h2>
                      <h3 className="condition">{weather?.weather[0]?.description}</h3>
                      <h1 className="temperature">{weather?.main?.temp} &#8451;</h1>
                      <div className="lat">
                        <p>H: {weather.coord.lat}</p>
                        <p>L: {weather.coord.lon}</p>
                      </div>
                      <hr />

                    </div>
                    <div className="main">
                      <h3>Country: {weather.sys.country}</h3>
                      <h3>Pressure: {weather?.main?.pressure} Pa</h3>
                      <h3>Wind Speed: {weather?.wind?.speed} m/s </h3>
                      <h3>Humidity: {weather?.main?.humidity} g/kg </h3>

                    </div>
                  </>

                )
            }

          </div>

        </div>
      </div>

    </>
  );
}


export default App;