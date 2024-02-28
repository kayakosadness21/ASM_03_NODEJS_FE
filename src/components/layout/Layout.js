import NavBar from "./NavBar";
import classes from "./Layout.module.css";
import Footer from "./Footer";
import Messenger from "../chat/messenger";
const Layout = (props) => {
  return (
    <>
      <NavBar />
      <div className={classes.main}>{props.children}</div>
      <Messenger />
      <Footer />
    </>
  );
};
export default Layout;
