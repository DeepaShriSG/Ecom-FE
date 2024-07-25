import React from "react";

function Footer() {
  return (
    <>
      <div className="w-100 footerStyle"> {/* Container for the entire footer */}
        <footer className="py-5"> {/* Main footer section with padding */}
          <div className="row"> {/* Bootstrap grid row */}
            {/* Section for footer links */}
            <div className="col-4 col-md-2 mb-3">
              <h5 className="footer-title">Section</h5>
              <ul className="nav flex-column list-unstyled">
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 footer-list">
                    Terms &amp; Conditions
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 footer-list">
                    Information
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 footer-list">
                    Privacy Policy
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 footer-list">
                    FAQs
                  </a>
                </li>
                <li className="nav-item mb-2">
                  <a href="#" className="nav-link p-0 footer-list">
                    About
                  </a>
                </li>
              </ul>
            </div>

            {/* Section for contact information */}
            <div className="col-8 col-md-3 mb-3">
              <h5 className="footer-title">Contact Information</h5>
              <ul className="nav flex-column list-unstyled">
                <li className="nav-item mb-2">
                  <span className=" m-2 footer-list">
                    <i className="bi bi-geo-alt-fill p-2"></i>
                    4005, Silver Business Point India
                  </span>
                </li>
                <li className="nav-item mb-2">
                  <span className=" m-2 footer-list">
                    <i className="bi bi-telephone-fill p-2 "></i>
                    +91 123456789
                  </span>
                </li>
                <li className="nav-item mb-2">
                  <span className=" m-2 footer-list">
                    <i className="bi bi-envelope p-2"></i>
                    demoexample@gmail.com
                  </span>
                </li>
              </ul>
            </div>

            {/* Section for newsletter subscription */}
            <div className="col-md-6 offset-md-1 mb-3 p-3">
              <form>
                <h5 className="footer-title">Subscribe to our newsletter</h5>
                <p className="footer-list">Monthly digest of what's new and exciting from us.</p>
                <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                  <label htmlFor="newsletter1" className="visually-hidden">
                    Email address
                  </label>
                  <input id="newsletter1" type="text" className="form-control p-2" placeholder="Email address" />
                  <button className="btn btn-light" type="button">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Footer bottom section with social media links */}
          <div className="d-flex flex-column flex-sm-row justify-content-between border-top">
            <p className="footer-list mt-2">© 2024 Company, Inc. All rights reserved.</p>
            <ul className="list-unstyled d-flex social-icons mt-2">
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <i className="bi bi-facebook  mx-2 nav-link p-0"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <i className="bi bi-twitter  mx-2 nav-link p-0"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <i className="bi bi-youtube  mx-2 nav-link p-0 "></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <i className="bi bi-pinterest  mx-2 nav-link p-0"></i>
                </a>
              </li>
              <li className="ms-3">
                <a className="link-body-emphasis" href="#">
                  <i className="bi bi-instagram  mx-2 nav-link p-0"></i>
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Footer;
