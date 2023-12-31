import "../css/App.css";
import { Routes, Route } from "react-router-dom";
import Footer from './components/Footer'
import Home from './pages/Home'; 
import Login from './pages/Login'
import Ofertas from './pages/Offers'
import ResponsiveAppBar from './components/Menu'
import Logout from "./pages/Logout";
import MyProfile from './pages/MyProfile';
import Error from './pages/Error';
import Register from './pages/Register';
import AboutUs from './pages/AboutUs';
import MyOfferts from './pages/MyOffers'
import JobDetail from './pages/JobDetail';
import ContactUs from './pages/ContactUs';
import NewOffert from './pages/NewOffer';
import MyJobs from './pages/MyJobs';
import Profile from './pages/Profile';
import ReviewsEmployer from './pages/ReviewsEmployer';
import ReviewsEmployee from './pages/ReviewsEmployee';
import { SnackbarProvider } from 'notistack';


function App() {
	return (
		<>
		    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'left' }}>

			<ResponsiveAppBar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
				<Route path="/logout" element={<Logout />} />
				<Route path="/registrar" element={<Register />} />
				<Route path="/mi-perfil" element={<MyProfile />} />
				<Route path="/nosotros" element={<AboutUs />} />
				<Route path="/ofertas" element={<Ofertas />} />
				<Route path="/mis-ofertas" element={<MyOfferts />} />
				<Route path="/jobs/:id" element={<JobDetail />} />
				<Route path="/perfil/:id" element={<Profile />} />
				<Route path="/contactanos" element={<ContactUs />} />
				<Route path="/nuevo-trabajo" element={<NewOffert />} />
				<Route path="/mis-trabajos" element={<MyJobs />} />
				<Route path="/resenas-trabajos" element={<ReviewsEmployer />} />
				<Route path="/resenas-ofertas" element={<ReviewsEmployee />} />
				<Route path="*"  element={<Error />} />
			</Routes>
      <Footer />
	  </SnackbarProvider>

		</>
	);
}

export default App;