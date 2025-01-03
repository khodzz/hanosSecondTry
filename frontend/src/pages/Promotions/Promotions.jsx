import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../store/reducers/products/products";
import { Link } from "react-router-dom";

import { add, remove } from "../../store/reducers/carts/CartSlice";
import SortingCategory from "../../components/SortingCategory/SortingCategory";
import "./Promotoins.scss";

const Promotions = () => {
  const { data, status, error } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [visibleCount, setVisibleCount] = useState(20); // Лимит отображаемых продуктов
  const [selectedCategory, setSelectedCategory] = useState("All"); // Выбранная категория
  const [filteredProducts, setFilteredProducts] = useState([]); // Отфильтрованные продукты
  const [sortOrder, setSortOrder] = useState(""); // Порядок сортировки (asc/desc)
  const cartItems = useSelector((state) => state.cart.cartItems);
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    let updatedProducts =
      selectedCategory === "All"
        ? data
        : data.filter((item) => item.category === selectedCategory);

    if (sortOrder === "asc") {
      updatedProducts = [...updatedProducts].sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      updatedProducts = [...updatedProducts].sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(updatedProducts);
  }, [selectedCategory, sortOrder, data]);

  const categories = ["All", ...new Set(data.map((item) => item.category))];

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value); // Устанавливаем порядок сортировки
  };

  return (
    <div className="Promotions">
      <div className="container cont">
        <SortingCategory
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="Promotions__cont">
          <h1 className="Promotions__title">Promotion</h1>
          <hr />

          <div className="Promotions__filter-context">
            <div className="context">
              <div className="Promotions__founder">
                {filteredProducts.length} Products Found
              </div>
            </div>
            <div className="Promotions__price-filter">
              <h2>Sort by:</h2>
              {/* Выпадающий список для сортировки */}
              <select value={sortOrder} onChange={handleSortChange}>
                <option value="">Default</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>

          <div className="Promotions__primary">
            {filteredProducts.slice(0, visibleCount).map((item) => (
              <div key={item.id} className="Promotions__primary-items">
                <div>
                  {cartItems.some((cartItem) => cartItem.id === item.id) ? (
                    <button
                      onClick={() => dispatch(remove({ id: item.id }))}
                      className="Promotions__primary-button"
                    >
                      Убрать с корзины
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(add(item))}
                      className="Promotions__primary-button"
                    >
                      В корзину
                    </button>
                  )}
                </div>

                <Link to={`/product/${item.id}`}>
                  <img
                    className="Promotions__primary-image"
                    src={item.image}
                    alt="product"
                  />
                </Link>
                <Link to={`/product/${item.id}`}>
                  <h2 className="Promotions__primary-title">{item.title}</h2>
                </Link>
                <Link to={`/product/${item.id}`}>
                  <p className="Promotions__primary-desc">{item.description}</p>
                </Link>
                <Link>
                  <p className="Promotions__primary-price">{item.price} Euro</p>
                </Link>
              </div>
            ))}
          </div>
          {visibleCount < filteredProducts.length && (
            <button onClick={loadMore} className="Promotions__load-more">
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
