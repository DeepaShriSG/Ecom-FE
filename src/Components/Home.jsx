import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Category from "./Category";

function Home() {

  let navigate = useNavigate(); // Hook to programmatically navigate between routes

  return (
    <>
      <div className="w-100">
        <div className="m-0 p-0">
          {/* Carousel component for the hero section */}
          <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {/* First carousel item */}
              <div
                className="carousel-item active p-5"
                data-bs-interval="5000"
                style={{
                  background: `url(/hero-image.png)`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="p-4 m-auto d-flex flex-column justify-content-center align-items-center text-center">
                  <h1 className="py-5 m-auto" style={{ color: "white" }}>
                    Organic Beauty Collection
                  </h1>
                  <h6
                    style={{
                      fontSize: "20px",
                      color: "#333030",
                      letterSpacing: "3px",
                    }}
                  >
                    BOOST YOUR FACE ROUTINE WITH
                  </h6>
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#333030",
                      lineHeight: "2.5",
                      letterSpacing: "2px",
                    }}
                  >
                    Bioavailable Plant Intelligence to Heal & Repair Skin.
                  </p>
                  {/* Button to navigate to the shop now page */}
                  <button type="button" className="btn btn-dark" onClick={() => navigate("/shopnow")}>
                    SHOP NOW
                  </button>
                </div>
              </div>
              {/* Second carousel item */}
              <div
                className="carousel-item p-5"
                data-bs-interval="5000"
                style={{
                  background: `url(/heroImage2.png)`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              >
                <div className="p-4 m-auto d-flex flex-column justify-content-center align-items-center text-center">
                  <h1 className="py-5 m-auto" style={{ color: "white" }}>
                    Organic Beauty Collection
                  </h1>
                  <p
                    style={{
                      fontSize: "20px",
                      color: "white",
                      letterSpacing: "2px",
                    }}
                  >
                    Dermatologically tested & Multi-award-winning formulations
                  </p>
                  <h6
                    style={{ 
                      fontSize: "18px",
                      fontWeight: "600",
                      color: "#1e1d1d",
                      lineHeight: "2.5",
                      letterSpacing: "3px"
                    }}
                  >
                    WITH CLINICALLY PROVEN RESULTS
                  </h6>
                  {/* Button to navigate to the shop now page */}
                  <button type="button" className="btn btn-dark" style={{ fontSize: "14px", lineHeight: "2.5", letterSpacing: "3px" }} onClick={() => navigate("/shopnow")}>
                    SHOP NOW
                  </button>
                </div>
              </div>
            </div>
            {/* Carousel controls */}
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        {/* Category section component */}
        <Category />
      </div>
    </>
  );
}

export default Home;
