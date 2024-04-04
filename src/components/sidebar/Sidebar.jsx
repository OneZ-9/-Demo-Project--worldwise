import styles from "./Sidebar.module.css";
import Logo from "../logo/Logo";
import AppNav from "../appnav/AppNav";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />

      <Outlet />
      {/* Like children prop Outlet component will pass dynamic components to route*/}

      <Footer />
    </div>
  );
}

export default Sidebar;
