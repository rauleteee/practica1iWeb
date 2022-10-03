/*********************************************************
* @author: Raúl Giménez Lorente
**********************************************************/
import CONFIG from "./config/config"
import Error from "./Error"
export default function Resultados(props){
	let serverStatus;
	let messageFromServer;

	/************************************
	 *  SERVER'S BEHAVIOUR
	 ************************************/
	serverStatus = props.response;
	messageFromServer = props.response1;
	if(!CONFIG.use_server){
		serverStatus = "200 OK";
		messageFromServer= "Loaded from mock data";
	}

	/************************************
	 *  SERVER'S CASE: ERROR 
	 ************************************/
	
	let renderError =  "";
	if(props.response!== 200){
		renderError = <Error/>
	}

console.log(props.items);
			return (
		
				<div id="resultados">
					
						<div id="space"/>
						
					
							<h2 id="timezone">
								Timezone: {props.items.timezone ? props.items.timezone : renderError}
							</h2>
							<h2 id="info">El tiempo en los próximos días será:</h2>
							
								{props.items.daily != null && props.items.daily.slice(0, props.numitems).map((items)=>{
									//console.log(items.weather[0].icon);
									let src = "http://openweathermap.org/img/wn/" + items.weather[0].icon + ".png";
									
									return (
									<div className="container" > 
										<ul>
											<h3>{new Date(items.dt * 1000).toLocaleDateString()}</h3>
											<img src={src}
											alt="weatherIcon" className="tiempoimg" />
											<p id="Temperatura">{"Temp: " +(items.temp.day - 273.15).toFixed(2) + "°C"}</p>
											<p id="Humedad">{"Humedad : "+items.humidity + "%"}</p>
											<p id="Viento">{"Viento: "+items.wind_speed + " m/s"}</p>
										</ul>
									</div>
									
									)
									
								})}

							<h3 id="server"> Server status: {serverStatus}</h3>
							<h3 id="serverMes"> Message from server: {messageFromServer}</h3>
					
							
				</div>);
		
		

}

	