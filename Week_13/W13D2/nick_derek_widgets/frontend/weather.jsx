import React from 'react';

export default class Weather extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            weather: ""
        };
        this.getWeather = this.getWeather.bind(this);
    }

    componentDidMount(){
        this.state.location = navigator.geolocation.getCurrentPosition(this.getWeather);
    }

    getWeather(location){
        const params = {
            lat: location.coords.latitude,
            lon :location.coords.longitude
        };
        const apiKey = "8372573b1d64f407817548626af4333e";
        //let url = "api.openweathermap.org/data/2.5/weather?";
        //debugger;
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&APPID=${apiKey}`;
        //url += toQueryString(params);
        //url += `&APPID=${apiKey}`;
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
            if (request.status === 200 && request.readyState === request.DONE){
                const data = JSON.parse(request.responseText);
                this.setState({weather: data});
            }
        }
        request.open('GET', url, true);
        request.send();
    }
    render(){
        if (this.state.weather){
            const weather = this.state.weather;
            const temp = Math.floor((weather.main.temp - 273.15) * 1.8 + 32);
            return (
              <div className = "weather">
                <h1>Weather</h1>
                <div className = "weather-content">
                  <p>{weather.name}</p>
                  <p>{temp} degrees</p>
                </div>
              </div>
            );
        }
        else {
            return(
                <h1 className = "loading">Loading weather</h1>
            )
        }
    }
}