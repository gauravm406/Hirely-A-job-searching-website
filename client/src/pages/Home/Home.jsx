import { useSelector } from "react-redux";
import "./home.css";
import Userhome from "../../components/Userhome/Userhome.jsx";
import AdminHome from "../../components/Adminhome/AdminHome.jsx";

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return userInfo?.isAdmin ? <AdminHome /> : <Userhome />;
};

export default Home;
