//API key  d912dba118305e0cd09686c9c7279a35
let weatherIcon = document.getElementById("icon");

async function callApi() {
  //metodo que hace el llamado a la api con la info del clima

  let call = await fetch(
    "https://api.openweathermap.org/data/2.5/onecall?lat=10.21376901023531&lon=-83.78961387331987&exclude=hourly,minutely&units=metric&appid=d912dba118305e0cd09686c9c7279a35"
  );

  let data = await call.json(); //variable que almacena los datos de la respuesta

  //console.log(data)
  return data;
}

async function timeConverter() {
  weatherData = await callApi(); //variable que almacena los datos de la llamada a la api en esta función

  let unix_timestamp = weatherData.current.dt;

  var date = new Date(unix_timestamp * 1000);
  // Hours part from the timestamp
  var hours = date.getHours();
  // Minutes part from the timestamp
  var minutes = "0" + date.getMinutes();

  // Will display time in 10:30 format
  var formattedTime =
    hours + ":" + minutes.substr(-2);

  weatherIcon.src = `http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`;

  console.log(weatherData.current)
  console.log(formattedTime);
  console.log(weatherData.current.weather[0].icon); //Se obtiene el id del icono del clima

  return formattedTime

}



timeConverter();
//callApi();
