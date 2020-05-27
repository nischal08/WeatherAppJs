window.addEventListener('load', () => {
  var long;
  var lat;
  let temperatureDescription = document.querySelector(
    '.temperature-description'
  );
  let temperatureDegree = document.querySelector('.temperature-degree');
  let temperatureTimeZone = document.querySelector('.location-timezone');
  let temperatureSection = document.querySelector('.temperature');
  let temperatureSpan = document.querySelector('.temperature span');

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      const api = `http://api.weatherapi.com/v1/current.json?key=521284fd4ef048aba5e41321202705&q=${lat},${long}`;
      fetch(api)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);

          const { temp_c, temp_f, condition } = data.current;
          const { tz_id } = data.location;
          //Set DOM elements
          temperatureDegree.textContent = temp_f;
          temperatureDescription.textContent = condition.text;
          temperatureTimeZone.textContent = tz_id;
          //Formula c
          let celsius = (temp_f - 32) * (5 / 9);
          //Set icon
          document.querySelector('.icon').src = condition.icon;

          //fartheneit
          temperatureSection.addEventListener('click', () => {
            if (temperatureSpan.textContent === 'F') {
              temperatureSpan.textContent = 'C';
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent =temp_f;
            }
          });
        });
    });
  }
});
