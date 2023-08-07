import "../css/App.css";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Footer from './Footer'
import Home from './Home'; 
import Index2 from './Index2'
import Login from './Login'

const technologies = [
	"Git",
	"HTML",
	"CSS",
	"JS",
	"React",
	"Bootstrap",
	"Java SE",
	"Spring Boot",
];

function HomeAnchor(): JSX.Element {
	return (
		<div>
			<a href="/">🏠Go to Home🏠</a>
		</div>
	);
}

function TechAnchor(): JSX.Element {
	return (
		<div>
			<a href="/techs">👨🏻‍💻Go to Techs👩🏻‍💻</a>
		</div>
	);
}

function ContactAnchor(): JSX.Element {
	return (
		<div>
			<a href="/contact">📩Go to Contact📩</a>
		</div>
	);
}

function Techs(): JSX.Element {
	return (
		<div>
			<HomeAnchor />
			<h1>Search Tecnologies Component</h1>
			{technologies.map((nameTechnology) => (
				<div key={nameTechnology}>
					<Link to={`../techs/${nameTechnology}`}>{nameTechnology} </Link>
				</div>
			))}
		</div>
	);
}

function Tech(): JSX.Element {
	const { tecnology } = useParams();
	return (
		<>
			<HomeAnchor />
			<TechAnchor />
			<h1>Hola {tecnology}</h1>
		</>
	);
}

function Ofertas(): JSX.Element {
	return (
		<>
			<h1>Ofertas Component</h1>
		</>
	);
}

function Menu(): JSX.Element {
	return (
		<div className="menu">
        <div>
          <img src="/src/assets/img/logo_long.png" alt=""/>
        </div>
        <div>
            <ul>
				<li><a href="/">Inicio</a></li>
                <li><a href="/ofertas">Buscar Ofertas</a></li>
            </ul>
        </div>
        <ul className="rightmenu">
		<li><a href="/login">Login</a></li>
            <li><a href="">Crear Cuenta</a></li>
        </ul>
      </div>
	);
}

function App() {
	return (
		<>
			{/* Fixed content remains unchanged when the React route changes. */}
			<Menu />
			<Routes>
				<Route path="/index2" element={<Index2 />} />
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/ofertas" element={<Ofertas />} />
				<Route path="/techs" element={<Techs />} />
				<Route path="/techs/:tecnology" element={<Tech />} />
				<Route path="*" element={<h1>❌Error! Not Found❌</h1>} />
			</Routes>
      <Footer />
		</>
	);
}

export default App;