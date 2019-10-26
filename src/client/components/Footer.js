import React from 'react';
import { Navbar } from 'react-bootstrap';

const Footer = () => (
  <Navbar className="footer" sticky="bottom" bg="light">
    <Navbar.Text className="col-xs-12 col-sm-4 footer-text">
      East Haven Animal Shelter
      <br />
      183 Commerce St, East Haven, Connecticut 06512
      <br />
      (203) 468-3249
    </Navbar.Text>
    <Navbar.Text className="col-xs-12 col-sm-4 footer-text">
      <a
        // eslint-disable-next-line react/jsx-no-target-blank
        target="_blank"
        title="follow us on facebook"
        href="https://www.facebook.com/EastHavenAnimalShelter"
      >
        <img
          alt="find us on facebook"
          src="https://c866088.ssl.cf3.rackcdn.com/assets/facebook30x30.png"
          border={0}
          className="facebook-button"
        />
      </a>
    </Navbar.Text>
    <Navbar.Text className="col-xs-12 col-sm-4 footer-text">
      Shelter Hours:
      <br />
      Monday-Saturday: 8am-3pm
      <br />
      Sunday: closed
    </Navbar.Text>
  </Navbar>
);

export default Footer;
