import "../css/App.css";
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import Home from './pages/Home'; 
import Index2 from './pages/Index2'
import Login from './pages/Login'
import Ofertas from './components/Ofertas'
import ResponsiveAppBar from './components/Menu'
import Register from './pages/Register'
import Logout from "./pages/Logout";
import Perfil from './pages/Perfil';
import SignUp from './pages/SignIn';

function App() {
	return (
		<>
			<ResponsiveAppBar />
			<Routes>
				<Route path="/SignIn" element={<SignUp />} />
				<Route path="/index2" element={<Index2 />} />
				<Route path="/Menu" element={<ResponsiveAppBar />} />
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/perfil" element={<Perfil />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/registrar" element={<Register />} />
				<Route path="/ofertas" element={<Ofertas />} />
				<Route path="*" element={<h1>❌Error! Not Found❌</h1>} />
			</Routes>
      <Footer />
		</>
	);
}

export default App;