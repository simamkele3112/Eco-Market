import React from "react";

const Home = () => {
  return (
    <>
      <main className="mt-5 text-center">
        <div className="container mb3">
          <div className="row row-cols-md-3 g-3 ms-auto">
            {/* Card Component */}
            {[
              {
                title: "M5 smart monitor",
                price: "R7 000",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit atque aliquid ut sequi vel voluptatibus eos quaerat quod aperiam laudantium.",
                imgSrc: "https://via.placeholder.com/200",
              },
              {
                title: "16 way DB-box",
                price: "R7 00",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit atque aliquid ut sequi vel voluptatibus eos quaerat quod aperiam laudantium.",
                imgSrc: "https://via.placeholder.com/200",
              },
              {
                title: "Gold R",
                price: "R20",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit atque aliquid ut sequi vel voluptatibus eos quaerat quod aperiam laudantium.",
                imgSrc: "https://via.placeholder.com/200",
              },
              {
                title: "Polo Vivo",
                price: "R20 000",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit atque aliquid ut sequi vel voluptatibus eos quaerat quod aperiam laudantium.",
                imgSrc: "https://via.placeholder.com/200",
              },
              {
                title: "C1 Bringer microphone",
                price: "R9 000",
                description:
                  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit atque aliquid ut sequi vel voluptatibus eos quaerat quod aperiam laudantium.",
                imgSrc: "https://via.placeholder.com/200",
              },
            ].map((item, index) => (
              <div
                className="card m-auto mb-3"
                style={{ width: "23rem" }}
                key={index}
              >
                <img
                  src={item.imgSrc}
                  alt={item.title}
                  className="img-fluid mb-3"
                  style={{ height: "15rem" }}
                />
                <div className="card-body">
                  <h5 className="card-title text-start">{item.title}</h5>
                  <p className="card-title text-start">{item.price}</p>
                  <p
                    className="card-title text-start"
                    style={{ fontSize: "1rem", opacity: 0.5 }}
                  >
                    mike <i className="fas fa-user-check"></i>
                  </p>
                  <p className="card-text text-start">{item.description}</p>
                  <div className="text-start">
                    <a href="#" className="btn btn-primary text-start">
                      Buy
                    </a>
                    <a href="#" className="btn btn-primary text-start">
                      wishlist+
                    </a>
                  </div>
                </div>
              </div>
            ))}
            {/* End Card Component */}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
