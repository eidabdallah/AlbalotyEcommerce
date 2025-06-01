import { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import styles from './Footer.module.css';
import logo from '../../../assets/logo/logoFooter.jpg';
import ToastMessage from './../ToastMessage/ToastMessage';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className={`${styles.footer} pt-5 pb-4`}>
      <div className="container">
        <div className="row gy-4 justify-content-between align-items-start text-start">
          <div className="col-md-4 text-center text-md-start">
            <img src={logo} alt="Al-Baloootiyeh Logo" className={styles.logo} />
          </div>
          <div className="col-md-2">
            <h5 className={styles.heading}>Quick Links</h5>
            <ul className={styles.navLinks}>
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          <div className="col-md-3">
            <h5 className={styles.heading}>Newsletter</h5>
            <p className={styles.description}>Subscribe to get the latest updates and offers!</p>
            <form className={styles.newsletter} onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Your Email"
                className={styles.newsletterInput}
                required
              />
              <button type="submit" className={styles.newsletterButton}>
                <MdEmail /> Subscribe
              </button>
              {subscribed && ToastMessage({ message: "Subscribed successfully", type: "success" })}
            </form>
          </div>

          <div className="col-md-3">
            <h5 className={styles.heading}>Stay Connected</h5>
            <div className={styles.socialIcons}>
              <a href="#" aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
              <a href="#" aria-label="YouTube"><FaYoutube /></a>
            </div>
          </div>
        </div>

        <hr className="text-secondary my-4" />
        <p className="text-center text-white-50 mb-0">
          © {new Date().getFullYear()} <span className="text-warning">Al-Balooootiyeh Store</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
