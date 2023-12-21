import React from "react";
import { Link } from "react-router-dom";

const Footer = ({ onClick }) => {
  return (
    <footer className="footer">
      <div className="footercontentA">
        <div className="social-links">
          <Link to="https://www.facebook.com" className="social-icon">
            <img src="/SPRINT2_IMAGES/FacebookLogo.png" alt="Facebook" />
          </Link>
          <Link to="https://www.instagram.com/" className="social-icon">
            <img src="/SPRINT2_IMAGES/InstagramLogo.png" alt="Instagram" />
          </Link>
          <Link to="https://twitter.com/home" className="social-icon">
            <img src="/SPRINT2_IMAGES/TwitterLogo.png" alt="Twitter" />
          </Link>
          <Link to="https://www.youtube.com/" className="social-icon">
            <img src="/SPRINT2_IMAGES/YouTubeLogo.png" alt="" />
          </Link>
        </div>
        <div className="copyright">
          © 2023 Fogtown Echoes. Some rights reserved.
        </div>
      </div>
      <div className="footercontentB">
        <div className="back-to-top" onClick={onClick}>
          <span className="backToTopBtn">Back to Top</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
