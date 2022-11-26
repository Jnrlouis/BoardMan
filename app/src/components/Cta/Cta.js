import React from "react";
import "./Cta.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Cta = () => {
  const navigate = useNavigate();
  return (
    <motion.div
      className="cta"
      whileInView={{ x: [-100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
    >
      <div className="cta__content">
        <p className="cta__para">
          You could be the next winner. Take the bold step and stand a chance to
          win big
        </p>

        <div className="ctabutton__div">
          <a href="#HeroArea" className="cta__button">
            Play Now
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default Cta;
