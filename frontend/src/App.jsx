import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";
import BackgroundVideo from "./components/BackgroundVideo";

function App() {
	const { authUser } = useAuthContext();
	return (
		<div className="relative h-screen overflow-hidden">
		<BackgroundVideo />
		<div className="absolute inset-0 flex items-center justify-center p-4">
		  <Routes>
			<Route path='/' element={authUser ? <Home /> : <Navigate to="/login" />} />
			<Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
			<Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
		  </Routes>
		  <Toaster />
		</div>
	  </div>
	);
}

export default App;
