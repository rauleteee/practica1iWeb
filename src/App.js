/*********************************************************
* @author: Raúl Giménez Lorente
**********************************************************/


import './App.css';
import Header from "./Header";
import Resultados from "./Resultados";

import {mock1} from "./constants/mock";
import { useState} from 'react';
import CONFIG from './config/config';


function App() {

	const [data, setData] = useState("");
	const [lat, setLat] = useState(CONFIG.default_lat);
	const [lon, setLon] = useState(CONFIG.default_lon);
	const [resp, setResponse] = useState("");
	
	//const[res, setRes] = useState("");
	//const[errorMessage, setErrormessage] = useState('');
	//const [isLoading, setIsLoading] = useState(true); 
	/*
	useEffect(()=>{
		fetchData()
	}, [])*/

	async function fetchData (a){
		
		if(CONFIG.use_server){
				try{
					var parms = "";
				
					if(a==="all"){
						parms = "?lat=" + lat + "&&lon=" + lon +
						"&&appid=" + CONFIG.api_key;
					}
					else{
						parms = "?appid=" + CONFIG.api_key;
					}

				//const controller = new AbortController()

				// 5 second timeout:
				//const timeoutId = setTimeout(() => controller.abort(), 5000)
					const res = await fetch(`${CONFIG.server_url}${parms}`);
					setResponse(res);
					const datos = await res.json();
					console.log(datos);
					//if (res.status === 200){
						//setErrormessage(datos);
						setData(datos);
					//}
				}catch(e){
						console.log(e);
						setData({e: {cod: resp.status, message: resp.statusText}});	
						console.log(data);	
				}

		}
		else{
			setData(mock1);
			//alert("Loaded data from local server!!");
		}
 
	};
  return (
    <div className="App">    
        <Header/>		
        <h2 id="titulo">El tiempo</h2>
        <div className="page">
			  <h2 id="buscador">			
				  <input id="latitud" placeholder={CONFIG.default_lat}
				  type="number" onChange={(e)=>setLat(e.target.value)} value={lat}/>
				  <input id="longitud" placeholder={CONFIG.default_lon} 
				  type="number" onChange={(e)=>setLon(e.target.value)} value={lon}/>
				  <button id="buscar" onClick={()=>(fetchData("all"))}>
					  Buscar
				  </button>
			  </h2>
		</div>
	
   {data && <Resultados items={data} numitems={CONFIG.num_items} response={resp.status} response1={resp.statusText}  />}
	

    </div>
  );
}

export default App;
