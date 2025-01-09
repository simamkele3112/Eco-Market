const Footer = () => {
  return (
    <>
      <footer className="bg-success text-white pt-4">
        <div className="container text-center">
          {/* Social Media Section */}
          <div className="socials mb-3">
            <a
              href="#"
              className="text-white me-3"
              aria-label="Visit us on Facebook"
            >
              <i className="fab fa-facebook fs-2"></i>
            </a>
            <a
              href="#"
              className="text-white me-3"
              aria-label="Connect with us on LinkedIn"
            >
              <i className="fab fa-linkedin fs-2"></i>
            </a>
            <a
              href="#"
              className="text-white me-3"
              aria-label="Check our projects on GitHub"
            >
              <i className="fab fa-github fs-2"></i>
            </a>
          </div>

          {/* Developer Attribution */}
          <div className="developer mb-3">
            <p>
              Website created by{" "}
              <a href="#" className="text-white text-decoration-underline">
                Lwandile
              </a>{" "}
              and{" "}
              <a href="#" className="text-white text-decoration-underline">
                Simamkele
              </a>
            </p>
          </div>

          {/* Copyright Section */}
          <div>
            <p className="mb-0 py-3">&copy; Eco-Friendly Marketplace 2024</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
