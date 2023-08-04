// import './App.css'
// import { Routes, Route} from "react-router-dom";

// function Index() : JSX.Element{
//   return <h1>Index page</h1>
// }

// function Contact() : JSX.Element{
//   return <h1>Contact page</h1>
// }


// function App() {

//   return (
//     <>
//       <h1>Hola</h1>
//       {/* <Index />
//       <Contact /> */}
//       <Routes>
//         <Route path="/index" element={<Index />} />
//         <Route path="/contacto" element={<Contact />} />
//       </Routes>
//     </>
//   )
// }

// export default App

// NEW CODE

import "../css/App.css";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Footer from './Footer';
import Home from './Home'; 

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
            <li><a href="">Crear Cuenta</a></li>
        </ul>
      </div>
	);
}

function Index2(): JSX.Element {
	return (
		<>
    <div className="box">
			<h1>Index Component</h1>
    </div>
			{/* <ContactAnchor />
			<TechAnchor /> */}
		</>
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