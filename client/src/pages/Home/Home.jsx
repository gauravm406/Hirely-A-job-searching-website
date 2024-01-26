import { useSelector } from "react-redux";
import { UserHome, AdminHome } from "../../components/index";

const Home = () => {
  const userInfo = useSelector((state) => state.user.userInfo);

  return userInfo?.isAdmin ? <AdminHome /> : <UserHome />;
};

export default Home;
