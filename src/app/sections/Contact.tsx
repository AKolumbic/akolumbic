"use client";

import React, { useState, useEffect } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaTwitch,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
// import { GiDiceTwentyFacesTwenty, GiDeathStar } from "react-icons/gi";
import {
  Footer,
  IconContainer,
  IconLink,
  Copyright,
  IconWrapper,
} from "../styles/Contact.styles";

export default function Contact() {
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Check if mobile on mount and on resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (!isClient) return null;

  return (
    <Footer className={isMobile ? "mobile-footer" : ""}>
      <IconContainer>
        <IconWrapper>
          <IconLink
            href="mailto:andrewkolumbic@gmail.com"
            target="_blank"
            aria-label="Email"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaEnvelope />
          </IconLink>
        </IconWrapper>

        <IconWrapper>
          <IconLink
            href="https://www.linkedin.com/in/andrew-kolumbic/"
            target="_blank"
            aria-label="LinkedIn"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaLinkedin />
          </IconLink>
        </IconWrapper>

        <IconWrapper>
          <IconLink
            href="https://github.com/AKolumbic"
            target="_blank"
            aria-label="GitHub"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaGithub />
          </IconLink>
        </IconWrapper>

        <IconWrapper>
          <IconLink
            href="https://www.twitch.tv/drosshole"
            target="_blank"
            aria-label="Twitch"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaTwitch />
          </IconLink>
        </IconWrapper>

        <IconWrapper>
          <IconLink
            href="https://www.instagram.com/drosshole/"
            target="_blank"
            aria-label="Instagram"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaInstagram />
          </IconLink>
        </IconWrapper>

        <IconWrapper>
          <IconLink
            href="https://twitter.com/drosshole"
            target="_blank"
            aria-label="Twitter"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <FaTwitter />
          </IconLink>
        </IconWrapper>

        {/* <IconWrapper>
          <IconLink
            href="https://drosshole.com"
            target="_blank"
            aria-label="Drosshole"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <GiDeathStar />
          </IconLink>
        </IconWrapper> */}

        {/* <IconWrapper>
          <IconLink
            href="https://falstera.com"
            target="_blank"
            aria-label="Falstera"
            whileHover={{ scale: 1.2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <GiDiceTwentyFacesTwenty />
          </IconLink>
        </IconWrapper> */}
      </IconContainer>

      <Copyright>© 2025 Andrew Kolumbic. All rights reserved.</Copyright>
    </Footer>
  );
}
