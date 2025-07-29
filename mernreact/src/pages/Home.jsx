import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { api } from '../lib/api';

export default function Home() {
  const [search, setSearch] = useState('');
  const [fooditem, setFoodItem] = useState([]);
  const [foodcat, setFoodCat] = useState([]);

  const loadData = async () => {
    try {
      const res = await api.post('/fooddata');
      setFoodItem(res.data[0]);
      setFoodCat(res.data[1]);
    } catch (error) {
      console.error("Error fetching food data:", error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div>
        <Navbar />
      </div>
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        style={{ objectFit: 'contain !important' }}
      >
        <div className="carousel-inner" id="carousel">
          <div className="carousel-caption" style={{ zIndex: '10' }}>
            <div className="d-flex justify-content-center">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="carousel-item active">
            <img
              src="gp4k2jro_burgers_625x300_20_June_22.jpg"
              className="d-block w-100"
              style={{ filter: 'brightness(30%)' }}
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d (1).jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="1568222255998.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleFade"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <div className="container">
        {foodcat.length > 0 ? (
          foodcat.map((data) => (
            <div className="row mb-3" key={data._id}>
              <div className="fs-3 m-3">{data.CategoryName}</div>
              <hr />
              {fooditem.length > 0 ? (
                fooditem
                  .filter(
                    (item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((filteritems) => (
                    <div
                      key={filteritems._id}
                      className="col-12 col-md-6 col-lg-3"
                    >
                      <Card
                        fooditem={filteritems}
                        options={filteritems.options[0]}
                      />
                    </div>
                  ))
              ) : (
                <div>No Data</div>
              )}
            </div>
          ))
        ) : (
          <div>nothing</div>
        )}
      </div>

      <Footer />
    </>
  );
}
