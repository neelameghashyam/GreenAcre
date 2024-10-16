import './App.css'
import { Routes, Route} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Login';
import Register from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import AuthContext from './context/AuthContext';
import ResetPassword from './pages/ResetPassword';
import Property from './pages/Properties/Property';
import Auction from './pages/Auctions/Auction';
import Article from './pages/Articles/Article';
import AreaConverter from './pages/AreaCalculator';
import Home from './pages/Home';
import AuctionList from './pages/Auctions/AuctionList';
import ArticlesAll from './pages/Articles/ArticlesAll';
import MyAuctions from './pages/Auctions/MyAuctions';
import PropertyDetails from './pages/Properties/PropertyDetails';
import AuctionDetails from './pages/Auctions/AuctionDetails';
import AllAuctions from './pages/Auctions/AllAuctions';
import AuctionsResults from './pages/Auctions/AuctionResults';
import AuctionResCalculation from './pages/Auctions/AuctionResCalculation';
import CompletedAuctions from './pages/Auctions/CompletedAuctions';
import MyProperties from './pages/Properties/MyProperties';
import RentReceipt from './pages/RentRecept';
import ListUsers from './pages/ListUsers';
import Forbidden from './pages/Forbidden';
import AuthorizRoute from './components/AuthorizeRoute';
import AllProperties from './pages/Properties/AllProperties-ad-mod';
import AdminDashboard from './pages/AdminDashboard';
import ModeratorDashboard from './pages/ModeratorDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import TermsAndCon from './pages/TermsAndCon';
import Account from './pages/Account';
import AboutUs from './pages/AboutUs';
import Faq from './pages/Faq';
import MainHome from './pages/MainHome';
import Success from './pages/Payments/Sucess';
import Failed from './pages/Payments/Failed'
import ArticleDetails from './pages/Articles/ArticleDetails';
import '@fortawesome/fontawesome-free/css/all.min.css';



import { useContext } from 'react';

function App() {
  const { handleLogout } = useContext(AuthContext);

  const logout = () => {
    handleLogout();
    toast.success('You have successfully logged out!')
  };

  return (
    
    <div >
      <Navbar />
      
      <div > 
       <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/profile" element={<PrivateRoute><Account /></PrivateRoute>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
          <Route path="/success" element={<PrivateRoute><Success /></PrivateRoute>} />
          <Route path="/failed" element={<PrivateRoute><Failed /></PrivateRoute>} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="/reset-password" element={<PrivateRoute><ResetPassword /></PrivateRoute>} />
          <Route path="/property" element={<PrivateRoute><Property /></PrivateRoute>} />
          <Route path="/auction" element={<PrivateRoute><Auction /></PrivateRoute>} />
          <Route path="/article" element={<PrivateRoute><AuthorizRoute permittedRoles={['admin', 'moderator']}><Article /></AuthorizRoute></PrivateRoute>} />
          <Route path="/admin-dashboard" element={<PrivateRoute><AuthorizRoute permittedRoles={['admin']}><AdminDashboard /></AuthorizRoute></PrivateRoute>} />
          <Route path="/moderator-dashboard" element={<PrivateRoute><AuthorizRoute permittedRoles={['moderator']}><ModeratorDashboard /></AuthorizRoute></PrivateRoute>} />
          <Route path="/my-auctions" element={<PrivateRoute><MyAuctions /></PrivateRoute>} />
          <Route path="/all-auctions" element={<PrivateRoute><AuthorizRoute permittedRoles={['admin', 'moderator']}><AllAuctions /></AuthorizRoute></PrivateRoute>} />
          <Route path="/results-calculation-auctions" element={<PrivateRoute><AuthorizRoute permittedRoles={['admin', 'moderator']}><AuctionsResults /></AuthorizRoute></PrivateRoute>} />
          <Route path="/all-properties" element={<PrivateRoute><AuthorizRoute permittedRoles={['admin', 'moderator']}><AllProperties /></AuthorizRoute></PrivateRoute>} />
          <Route path="/property/:id" element={<PrivateRoute><PropertyDetails /></PrivateRoute>} />
          <Route path="/auction/:id" element={<PrivateRoute><AuctionDetails /></PrivateRoute>} />
          <Route path="/auction-calculation/:id" element={<PrivateRoute><AuctionResCalculation /></PrivateRoute>} />
          <Route path="/completed-auctions" element={<PrivateRoute><CompletedAuctions /></PrivateRoute>} />
          <Route path="/my-properties" element={<PrivateRoute><MyProperties /></PrivateRoute>} />
          <Route path="/list-users" element={<PrivateRoute><AuthorizRoute permittedRoles={['admin', 'moderator']}><ListUsers /></AuthorizRoute></PrivateRoute>} />
          <Route path="/area-converter" element={<AreaConverter />} />
          <Route path="/home" element={<Home />} />
          <Route path="/rent-receipt" element={<RentReceipt />} />
          <Route path="/auctions" element={<AuctionList />} />
          <Route path="/articles" element={<ArticlesAll />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/terms" element={<TermsAndCon />} />

        </Routes>
      </div>
      <ToastContainer />
      <Footer/>
    </div>
  );
}

export default App;
