/*********************************************************
* @author: Raúl Giménez Lorente
**********************************************************/

export default function Header(props){
		return(
			<div id="cabecera">
				<img src={process.env.PUBLIC_URL + "/sun.png"}  alt="logo" className="logo"/>
				<h3 className="mensaje"> Esta es la página de Raul Gimenez Lorente</h3>
			</div>
		);
		}