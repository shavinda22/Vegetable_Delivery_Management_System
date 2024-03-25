import React from "react";
import "./css/Footer.css";

export default function () {
  return (
    <div className="foot ">
      <div className="container">
        <div>
          <footer className="py-5  mainFooter ">
            <div className="row mainDiv">
              <div className="col-6 col-md-2 mb-3">
                <h5>Contact Us</h5>
                <ul className="nav flex-column">
                  <p className="details">
                    Store Location - 50, Anagarika Dharmapala Mawatha(Zoo Road),
                    Dehiwala
                  </p>
                  <p className="details">Whatsapp Support - +94701234567</p>
                </ul>
              </div>

              <div className="col-6 col-md-2 mb-3 mt-4 second">
                <h5></h5>
                <ul className="nav flex-column  ">
                  <p className="details">Fax - +94112345678</p>
                  <p className="details">Email - vegifast@gmail.com</p>
                </ul>
              </div>

              <div className="col-6 col-md-2 mb-3 mt-4">
                <h5></h5>
                <ul className="nav flex-column">
                  <a className="footerLink" href="/about">
                    About Us
                  </a>
                  <a className="footerLink" href="/orders">
                    Orders Status
                  </a>
                </ul>
              </div>

              <div className="col-6 col-md-2 mb-3 fourthColum mt-4">
                <h5></h5>
                <ul className="nav flex-column">
                  <p>Business Hours - Open 8am - 11pm </p>
                  <p>24 Hours Customer Service </p>
                </ul>
              </div>

              <div className="col-6 col-md-2 mb-3 fourthColum mt-4">
                <h5></h5>
                <ul className="nav flex-column">
                  <a className="footerLink" href="https://facebook.com">
                    Facebook
                  </a>
                  <a className="footerLink" href="https://twitter.com/">
                    Twitter
                  </a>
                </ul>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
