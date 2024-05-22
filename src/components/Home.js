import React, { Component } from "react";
import Header from "./Header";
import FilterSection from "./FilterSection";
import ProductItems from "./ProductItems";
import { TailSpin as Loader } from "react-loader-spinner";
import "../styles/Home.css";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  inProgress: "IN_PROGRESS",
};

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    filtersApiStatus: apiStatusConstants.initial,
    categoryList: [],
    totalProducts: 0,
    totalPages: 0,
    page: 1,
    productsList: [],
    filters: [],
    activeTab: "All",
  };

  componentDidMount() {
    this.fetchFiltersApi()
    this.fetchApi();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  fetchApi = async () => {
    const { page, filters, apiStatus } = this.state;

    // Prevent API call if already in progress or if there are no more pages to load
    if (apiStatus === apiStatusConstants.inProgress) return;

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    });

    // Fetch products
    const payload = {
      input: {
        page,
        pageSize: 10,
        filters,
        id: "#HomeHunts",
        entity: "vibe",
      },
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    const response = await fetch(
      "https://api.furrl.in/api/v2/listing/getListingProducts",
      options
    );

    if (response.ok) {
      const updatedResponse = await response.json();
      const { data } = updatedResponse;
      const { getListingProducts } = data;
      const { products, totalPages, totalProducts } = getListingProducts;

      this.setState((prevState) => {
        // Filter out duplicate products
        const newProducts = products.filter(
          (product) =>
            !prevState.productsList.some(
              (existingProduct) => existingProduct.id === product.id
            )
        );

        return {
          productsList: [...prevState.productsList, ...newProducts],
          totalProducts,
          totalPages,
          apiStatus: apiStatusConstants.success,
          page: prevState.page + 1,
        };
      });
    } else {
      this.setState({ apiStatus: apiStatusConstants.failure });
    }
  };

  fetchFiltersApi = async () => {
    this.setState({
      filtersApiStatus: apiStatusConstants.inProgress,
    });
    // Fetch filters
    const filterApiBody = { id: "#HomeHunts", entity: "vibe" };
    const filterApiOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filterApiBody),
    };
    const filterListResponse = await fetch(
      "https://api.furrl.in/api/v2/listing/getListingFilters",
      filterApiOptions
    );

    if (filterListResponse.ok) {
      const updatedResponse = await filterListResponse.json();
      const { data } = updatedResponse;
      const { getListingFilters } = data;
      const { easyFilters } = getListingFilters;
      this.setState({
        filtersApiStatus: apiStatusConstants.success,
        categoryList: easyFilters,
      });
    } else {
      this.setState({ filtersApiStatus: apiStatusConstants.failure });
    }
  };

  handleScroll = () => {
    const { apiStatus, page, totalPages } = this.state;
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight &&
      apiStatus !== apiStatusConstants.inProgress &&
      page <= totalPages
    ) {
      this.fetchApi();
    }
  };

  changeActiveTab = (uniqueId) => {
    if (uniqueId === "All") {
      this.setState({ filters: [], activeTab: uniqueId, productsList: [] });
    } else {
      this.setState({
        filters: [{ id: uniqueId, type: "CATEGORY" }],
        activeTab: uniqueId, productsList: []
      });
    }
    this.fetchApi()
  };

  renderCategoryList = () => {
    const { categoryList, activeTab } = this.state;
    return (
      <div className="category_container">
        <div className="category_container_child">
          <div className="buttons_container">
            <button
              key="All"
              className={activeTab === "All" ? "activebuttonTab" : "buttonTab"}
              onClick={() => this.changeActiveTab("All")}
            >
              All
            </button>
            {categoryList.map((eachCategory) => (
              <button
                onClick={() =>
                  this.changeActiveTab(
                    eachCategory.uniqueId,
                    eachCategory.contentType
                  )
                }
                key={eachCategory.uniqueId}
                className={
                  activeTab === eachCategory.uniqueId
                    ? "activebuttontab"
                    : "buttonTab"
                }
              >
                {eachCategory.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  renderProductList = () => {
    const { productsList } = this.state;
    return (
      <ul className="ul_productList_container">
        {productsList.map((eachProduct, index) => {
          const isFullRow = index === 2 || (index - 2) % 5 === 0;
          eachProduct.isFullRow = isFullRow;
          return (
            <ProductItems key={eachProduct.id} productItem={eachProduct} />
          );
        })}
      </ul>
    );
  };

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  );

  renderFailureView = () => (
    <div>
      <h1>Failed to Fetch</h1>
    </div>
  );

  renderFilterList = () => {
    const { filtersApiStatus } = this.state;

    switch (filtersApiStatus) {
      case apiStatusConstants.success:
        return this.renderCategoryList();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  renderApiElements = () => {
    const { apiStatus } = this.state;

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductList();
      case apiStatusConstants.inProgress:
        return this.renderLoadingView();
      case apiStatusConstants.failure:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    const { totalProducts } = this.state;
    return (
      <div>
        <Header />
        <div className="home_container">
          <div className="vibe-page-top-background">
            <p className="vibe-page-top-title">#HomeHunts</p>
          </div>
          <FilterSection totalProducts={totalProducts} />
          {this.renderFilterList()}
          {this.renderApiElements()}
        </div>
      </div>
    );
  }
}

export default Home;
