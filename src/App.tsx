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

import "./App.css";
import { Routes, Route, Link, useParams } from "react-router-dom";
import Footer from './Footer'

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

function Contact(): JSX.Element {
	return (
		<>
			<HomeAnchor />
			<h1>Contact Component</h1>
		</>
	);
}

function Index(): JSX.Element {
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
      <div className="menu">
        <div>
          <img src="/src/assets/img/logo_long.png" alt=""/>
        </div>
        <div>
            <ul>
                <li><a href="">Buscar Ofertas</a></li>
                <li><a href="">Valoraciones</a></li>
                <li><a href="">Trabajos Realizados</a></li>
            </ul>
        </div>
        <ul className="rightmenu">
            <li><a href="">Crear Cuenta</a></li>
        </ul>
      </div>
			<Routes>
				{/* Dynamic content that will appear/show on the page when the 
				path/route is changed to the specified one. */}
				<Route path="/" element={<Index />} />
				{/* <Route path="/contact" element={<Contact />} />
				<Route path="/techs" element={<Techs />} />
				<Route path="/techs/:tecnology" element={<Tech />} /> */}
				{/* Default route for all other requests */}
				<Route path="*" element={<h1>❌Error! Not Found❌</h1>} />
			</Routes>
      <Footer />
		</>
	);
}

export default App;