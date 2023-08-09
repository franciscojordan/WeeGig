import "../css/App.css";
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import Home from './pages/Home'; 
import Index2 from './pages/Index2'
import Login from './pages/Login'
import Ofertas from './components/Ofertas'
import ResponsiveAppBar from './components/Menu'
import Register from './pages/Register'

/* function Menu(): JSX.Element {
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
} */

function App() {
	return (
		<>
			{/* Fixed content remains unchanged when the React route changes. */}
			<ResponsiveAppBar />
			<Routes>
				<Route path="/index2" element={<Index2 />} />
				<Route path="/Menu" element={<ResponsiveAppBar />} />
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/registrar" element={<Register />} />
				<Route path="/ofertas" element={<Ofertas />} />
				<Route path="*" element={<h1>❌Error! Not Found❌</h1>} />
			</Routes>
      <Footer />
		</>
	);
}

export default App;