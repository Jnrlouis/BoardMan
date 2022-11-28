import React from "react";
import "./Footer.css";
import { IoLogoTwitter } from "react-icons/io";
import { FiInstagram } from "react-icons/fi";
import { FaFacebook } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.jpg";

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div className="footer">
      <footer>
        <div className="footer__container">
          <div className="footer__row">
            <div className="footer__col">
              <h4>BOARDMAN</h4>
              <ul>
                <li>Terms and Conditions</li>
                <img src={logo} alt="" className="logo" />
              </ul>
            </div>

            <div className="footer__col">
              <h4>QUICK LINKS</h4>
              <ul>
                <li onClick={() => navigate("/")}>Home</li>
                <li onClick={() => navigate("createBet")}>CreateBet</li>
                <li onClick={() => navigate("bets")}>Bets</li>
                <li onClick={() => navigate("history")}>Bet History</li>
                <li onClick={() => navigate("team")}>Team</li>
              </ul>
            </div>

            <div className="footer__col">
              <h4>GET HELP</h4>
              <ul>
                <li onClick={() => navigate("help")}>Help</li>
                <li onClick={() => navigate("contact")}>Contact us</li>
              </ul>
            </div>

            <div className="footer__col">
              <h4>FOLLOW US</h4>
              <div className="social__links">
                <a
                  href="https://m.facebook.com/ibadin.ehis"
                  target="_blank"
                  className="fa"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/ib_meshach/"
                  target="_blank"
                  className="ig"
                >
                  <FiInstagram />
                </a>
                <a
                  href="https://mobile.twitter.com/Ehimeshach"
                  target="_blank"
                  className="tw"
                >
                  <IoLogoTwitter />
                </a>
                <a
                  href="https://www.linkedin.com/in/ibadin-meshach-b65bb2241"
                  target="_blank"
                  className="ln"
                >
                  <AiFillLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
