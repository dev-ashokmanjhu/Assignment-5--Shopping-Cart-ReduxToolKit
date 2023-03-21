import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <header className={classes.header}>
        <Link to="/">
          <h1>Assignment 5</h1>
        </Link>
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
    </>
  );
};

export default Header;
