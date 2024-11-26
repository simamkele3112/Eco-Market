import React from 'react';
import { FaUsers, FaRegLightbulb, FaRegHandshake, FaAward } from 'react-icons/fa';
import './About.css'; 

const About = () => {
  return (
    <>
      <div className="container mt-5">
        <h2 className="text-center mb-4 animate__animated animate__fadeIn">About Us</h2>
        <div className="row text-center">
          <div className="col-md-3">
            <div className="card shadow-lg p-4 mb-4 animate__animated animate__fadeIn animate__delay-1s">
              <FaUsers className="icon-size mb-3" />
              <h4>Our Community</h4>
              <p>
                We bring together passionate individuals focused on making a positive impact
                through eco-friendly initiatives. Join our community of like-minded people.
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-lg p-4 mb-4 animate__animated animate__fadeIn animate__delay-2s">
              <FaRegLightbulb className="icon-size mb-3" />
              <h4>Innovative Ideas</h4>
              <p>
                We are committed to pushing the boundaries of creativity, offering sustainable
                solutions that benefit the environment.
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-lg p-4 mb-4 animate__animated animate__fadeIn animate__delay-3s">
              <FaRegHandshake className="icon-size mb-3" />
              <h4>Collaborations</h4>
              <p>
                We believe in the power of partnerships. Together, we can create lasting
                solutions for a more sustainable future.
              </p>
            </div>
          </div>

          <div className="col-md-3">
            <div className="card shadow-lg p-4 mb-4 animate__animated animate__fadeIn animate__delay-4s">
              <FaAward className="icon-size mb-3" />
              <h4>Our Achievements</h4>
              <p>
                With hard work and dedication, we’ve made significant strides in building a
                sustainable marketplace for eco-friendly goods.
              </p>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <p className="lead animate__animated animate__fadeIn animate__delay-5s">
            Join us on our journey to a greener, more sustainable world. Let's make a difference
            together.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
