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
import MyOfferts from './pages/MyOfferts';
import JobDetail from "./pages/JobDetail";
import AboutUs from "./pages/AboutUs";
import ContactUs from './pages/ContactUs';
import NewOffert from './pages/NewOffert';
import MyJobs from './pages/MyJobs';

function App() {
	return (
		<>
			<ResponsiveAppBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/registrar" element={<Register />} />
				<Route path="/perfil" element={<Perfil />} />
				<Route path="/nosotros" element={<AboutUs />} />
				<Route path="/ofertas" element={<Ofertas />} />
				<Route path="/mis-ofertas" element={<MyOfferts />} />
				<Route path="/jobs/:id" element={<JobDetail />} />
				<Route path="/contactanos" element={<ContactUs />} />
				<Route path="/nueva-oferta" element={<NewOffert />} />
				<Route path="/mis-trabajos" element={<MyJobs />} />
				<Route path="*"  element={<Error />} />
			</Routes>
      <Footer />
		</>
	);
}

export default App;