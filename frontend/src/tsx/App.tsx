import "../css/App.css";
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import Home from './pages/Home'; 
import Login from './pages/Login'
import Ofertas from './pages/Ofertas'
import ResponsiveAppBar from './components/Menu'
import Logout from "./pages/Logout";
import Perfil from './pages/Perfil';
import Error from './pages/Error';
import Register from './pages/Register';
import OferForm from './pages/OferForm';
import SignUp from './pages/SignIn';
function App() {
	return (
		<>
			<ResponsiveAppBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/SignIn" element={<SignUp />} />
				<Route path="/OferForm" element={<OferForm />} />
				<Route path="/registrar" element={<Register />} />
				<Route path="/perfil" element={<Perfil />} />
				<Route path="/ofertas" element={<Ofertas />} />
				<Route path="*"  element={<Error />} />
			</Routes>
      <Footer />
		</>
	);
}

export default App;