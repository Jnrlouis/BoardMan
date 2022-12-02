import React from "react";
import "./styles/Team.css";
import p1 from "../assets/p1.png";
import p2 from "../assets/p2.png";
import p3 from "../assets/p3.png";
import louis from "../assets/louis.jpg";

import { motion } from "framer-motion";
import { FaDiscord, FaFacebook, FaStar } from "react-icons/fa";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { FiInstagram } from "react-icons/fi";
import { IoLogoTwitter } from "react-icons/io";

const Team = () => {
  return (
    <motion.div
      whileInView={{ x: [300, 0], opacity: [0, 1] }}
      transition={{ duration: 0.7 }}
    >
      <div className="about">
        <div className="user">
          <h1>Meet the Team</h1>
          <div className="p-text">
            <p>
              Here is the team behind BoardMan
              <br />
            </p>
          </div>

          <div className="block">
            <motion.div whileHover={{ scale: 0.97 }}>
              <div className="card">
                <span className="star">
                  <div className="social__links1">
                    <a
                      href="https://discordapp.com/users/631676256638861312"
                      target="_blank"
                      className="fa"
                    >
                      <FaDiscord />
                    </a>
                    <a
                      href="https://github.com/jnrlouis"
                      target="_blank"
                      className="ig1"
                    >
                      <AiFillGithub />
                    </a>
                    <a
                      href="https://twitter.com/Lo0_0u"
                      target="_blank"
                      className="tw"
                    >
                      <IoLogoTwitter />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/chibueze-louis-145a3bb6"
                      target="_blank"
                      className="ln"
                    >
                      <AiFillLinkedin />
                    </a>
                  </div>
                </span>
                <p>Louis - Blockchain Developer</p>
                <span className="img-block">
                  <img src={louis} alt="user picture" />
                  <div>
                    <h3 className="name">JnrLouis</h3>
                    <p className="title">Blockchain/Frontend</p>
                  </div>
                </span>
              </div>
            </motion.div>

            <motion.div whileHover={{ scale: 0.97 }}>
              <div className="card">
                <span className="star">
                  <div className="social__links1">
                    <a href="#" target="_blank" className="fa">
                      <FaDiscord />
                    </a>
                    <a
                      href="https://www.instagram.com/ib_meshach/"
                      target="_blank"
                      className="ig1"
                    >
                      <AiFillGithub />
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
                </span>
                <p>Meshach - Blockchain Developer</p>
                <span className="img-block">
                  <img src={p3} alt="user picture" />
                  <div>
                    <h3 className="name">Ibmeshach</h3>
                    <p className="title">Frontend/Blockchain</p>
                  </div>
                </span>
              </div>
            </motion.div>

            {/* <motion.div whileHover={{ scale: 0.97 }}>
              <div className="card">
                <span className="star">
                  <div className="social__links1">
                    <a href="#" target="_blank" className="fa">
                      <FaDiscord />
                    </a>
                    <a href="#" target="_blank" className="ig1">
                      <AiFillGithub />
                    </a>
                    <a
                      href="https://mobile.twitter.com/Fi_bond/"
                      target="_blank"
                      className="tw"
                    >
                      <IoLogoTwitter />
                    </a>
                    <a href="#" target="_blank" className="ln">
                      <AiFillLinkedin />
                    </a>
                  </div>
                </span>
                <p>Oshodin - Web Designer</p>
                <span className="img-block">
                  <img src={p1} alt="user picture" />
                  <div>
                    <h3 className="name">FinBond</h3>
                    <p className="title">Ui/Ux</p>
                  </div>
                </span>
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Team;
