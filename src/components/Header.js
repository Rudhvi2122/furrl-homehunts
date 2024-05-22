import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { IoBookmarkOutline, IoBagOutline } from "react-icons/io5";

import "../styles/Header.css";

const Header = () => {
  return (
    <nav>
      <div className="navbarContainer">
        <Link to="/" className="linkroutelogo">
          <img
            className="imagelogo"
            alt="logo"
            src="https://web.furrl.in/_next/static/media/Furrl.13550a62.svg"
          />
        </Link>

        <h1 className="navbarHeader">#HomeHunts</h1>
        <ul className="wishlistAndCartIconContainer">
          <li>
            <CiSearch className="carticon" />
          </li>
          <li>
            <Link className="linkroute" to="/wishlist">
              <IoBookmarkOutline className="wishlisticon" />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="linkroute">
              <IoBagOutline className="carticon" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
