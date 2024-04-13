import Sidebar from "../components/Sidebar/Sidebar";
import Map from "../components/map/Map";
import User from "../components/user/User";
import styles from "./AppLayout.module.css";

function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />

      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
