//API key  29e1813204b7207458e8a3a3816f3a69
let actualWeatherIcon = document.getElementById("icon");
let actualIconDescription = document.getElementsByClassName('icon-description')
let actualDate = document.getElementsByClassName("date");
let actualHour = document.getElementsByClassName("hour");
let actualTemperature = document.getElementsByClassName("actual-temperature");
let actualTermicalSensation = document.getElementsByClassName(
  "actual-termical-sensation"
);
let actualCity = document.getElementsByTagName("actual-city");
let nextDayTag = document.getElementsByClassName("next-day-tag");
let nextDayIcon = document.getElementsByClassName("next-day-icon");
let nextDayTemp = document.getElementsByClassName("next-day-temp");

async function callApi() { //metodo que hace el llamado a la api con la info del clima

  let call = await fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=10.21376901023531&lon=-83.78961387331987&exclude=hourly,minutely&units=metric&appid=29e1813204b7207458e8a3a3816f3a69"
  );

  let data = await call.json(); //variable que almacena los datos de la respuesta

  console.log("Actualización!");

  //Se establece la hora actual en la nterfaz----------------------------------------------------------------------------
  let timeConverted = actualTimeConverter(data.current.dt);
  actualHour[0].innerHTML = timeConverted;
  //---------------------------------------------------------------------------------

  //Se establece la temperatura y la sensación termica actual en la interfaz----------------------------------------------------------------------------
  actualTemperature[0].innerHTML = Math.trunc(data.current.temp) + "°C";
  actualTermicalSensation[0].innerHTML =
    Math.trunc(data.current.feels_like) + "°C";
  //-----------------------------------------------------------------------------------

  //Se establece el icono del clima actual---------------------------------------------
  actualWeatherIcon.src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}@2x.png`;

  actualIconDescription[0].innerHTML = data.current.weather[0].main;
  //-----------------------------------------------------------------------------------

  //Se establece la ciudad a la que se solicita la temperatura (de momento solo Guápiles, se solicita por lon y lat en la URL de la API)-----------------------------------------

  //La api no me da las ciudades exactas

  //----------------------------------------------------------------------------------

  //Se establece el pronóstico para los siguientes días---------------------------------
  nextDayTag[0].innerHTML = getNextDays(data.daily[0].dt);
  nextDayTag[1].innerHTML = getNextDays(data.daily[1].dt);
  nextDayTag[2].innerHTML = getNextDays(data.daily[2].dt);
  nextDayTag[3].innerHTML = getNextDays(data.daily[3].dt);

  nextDayIcon[0].src = `http://openweathermap.org/img/wn/${data.daily[0].weather[0].icon}@2x.png`;

  nextDayIcon[1].src = `http://openweathermap.org/img/wn/${data.daily[1].weather[0].icon}@2x.png`;

  nextDayIcon[2].src = `http://openweathermap.org/img/wn/${data.daily[2].weather[0].icon}@2x.png`;

  nextDayIcon[3].src = `http://openweathermap.org/img/wn/${data.daily[3].weather[0].icon}@2x.png`;

  nextDayTemp[0].innerHTML = Math.trunc(data.daily[0].temp.day) + "°C";
  nextDayTemp[1].innerHTML = Math.trunc(data.daily[1].temp.day) + "°C";
  nextDayTemp[2].innerHTML = Math.trunc(data.daily[2].temp.day) + "°C";
  nextDayTemp[3].innerHTML = Math.trunc(data.daily[3].temp.day) + "°C";

  //-------------------------------------------------------------------------------------

  return data;
}

function actualTimeConverter(unix_timestamp) {
  //let days = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"];

  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();

  var ampm = hours >= 12 ? "PM" : "AM";

  // Will display time in 10:30 format
  var formattedTime = hours + ":" + minutes.substr(-2) + ampm;

  return formattedTime;
}

async function getActualDate() {
  let months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Setiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0"); //Enero es 0

  today = months[mm.charAt(1) - 1] + " " + dd + ",";

  actualDate[0].innerHTML = today;

  return today;
}

function getNextDays(unix_timestamp) {
  let date = new Date(unix_timestamp * 1000);
  let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let dayOfWeek = days[date.getDay()]; //Variable que almacena el día

  return dayOfWeek;
}

getActualDate();
callApi();
setInterval(async function () {
  await callApi();
  getActualDate();
}, 10000);
