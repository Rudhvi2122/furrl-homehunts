import { BiSortAlt2 } from "react-icons/bi";
import { CiFilter } from "react-icons/ci";

const FilterSection = props => {
    const{totalProducts} = props
  return (
    <div>
      <div className="vibe-page-filter-section">
        <div className="total_products_container">
          <div className="total_products_container_child">
            <p className="product_para">Shop Products</p>
            <div></div>
            <p className="total_products_para">{totalProducts} Products</p>
          </div>
        </div>
        <div className="icons_container">
          <button>
            <BiSortAlt2 />
          </button>
          <button>
            <CiFilter />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
