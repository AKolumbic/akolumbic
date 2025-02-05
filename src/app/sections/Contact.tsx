import React from "react";
import {
  FaLinkedin,
  FaGithub,
  FaTwitch,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
} from "react-icons/fa";
import { GiDiceTwentyFacesTwenty, GiDeathStar } from "react-icons/gi";
import {
  Footer,
  IconContainer,
  IconLink,
  Copyright,
} from "../styles/Contact.styles";

export default function Contact() {
  return (
    <Footer>
      <IconContainer>
        <IconLink
          href="mailto:andrewkolumbic@gmail.com"
          target="_blank"
          aria-label="Email"
        >
          <FaEnvelope />
        </IconLink>
        <IconLink
          href="https://www.linkedin.com/in/andrew-kolumbic-21549a163/"
          target="_blank"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </IconLink>
        <IconLink
          href="https://github.com/AKolumbic"
          target="_blank"
          aria-label="GitHub"
        >
          <FaGithub />
        </IconLink>
        <IconLink
          href="https://www.twitch.tv/drosshole"
          target="_blank"
          aria-label="Twitch"
        >
          <FaTwitch />
        </IconLink>
        <IconLink
          href="https://www.instagram.com/drosshole/"
          target="_blank"
          aria-label="Instagram"
        >
          <FaInstagram />
        </IconLink>
        <IconLink
          href="https://twitter.com/drosshole"
          target="_blank"
          aria-label="Twitter"
        >
          <FaTwitter />
        </IconLink>
        <IconLink
          href="https://drosshole.com"
          target="_blank"
          aria-label="Drosshole"
        >
          <GiDeathStar />
        </IconLink>
        <IconLink
          href="https://falstera.com"
          target="_blank"
          aria-label="Falstera"
        >
          <GiDiceTwentyFacesTwenty />
        </IconLink>
      </IconContainer>

      <Copyright>
        © {new Date().getFullYear()} Andrew Kolumbic. All rights reserved.
      </Copyright>
    </Footer>
  );
}
