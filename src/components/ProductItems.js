import { Link } from "react-router-dom";
import "../styles/ProductItems.css";
import ShareButton from "./ShareButton";

const ProductDetails = (props) => {
  const { productItem } = props;
  const { MRP, id, discountPercent, images, price, title, vendor, isFullRow } =
    productItem;

  const fullRowClass = isFullRow ? "full-row" : "half-row";

  const backgroundImageCss = {
    backgroundImage: `url(${images[0].src})`,
    height: "22vh",
    // width: "100%",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "end",
    alignItems: "flex-end",
    transition: "2s ease-in",
  };

  return (
    <li className={`${fullRowClass}`}>
      <div className="itemcontainer">
        <div style={backgroundImageCss}>
          <ShareButton key={id} id={id} />
        </div>
        <Link
          className={`linkele itembanner `}
          to={`https://furrl.in/productDetail?id=${id}`}
        >
          <div>
            <p className="vendor">{vendor}</p>
            <p className="title">{title}</p>
            <div className="priceContainer">
              <p className="originalprice">Rs.{price.value}</p>
              <p className="mrpPrice">Rs.{MRP.value}</p>
              <p className="discountpercentage">{discountPercent}%</p>
            </div>
          </div>
        </Link>
      </div>
    </li>
  );
};

export default ProductDetails;
