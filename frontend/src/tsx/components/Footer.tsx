import "../../css/components/Footer.css";

import {
  Phone,
  Home,
  Email,
  Print,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";

function Footer() {
  return (
    <div className="footer">
      <div className="box_1">
        <div>Get connected with us on social networks:</div>
        <div className="list">
          <ul>
            <li>
              <a href="">
                <Instagram />
              </a>
            </li>
            <li>
              <a href="">
                <LinkedIn />
              </a>
            </li>
            <li>
              <a href="">
                <Twitter />
              </a>
            </li>
            <li>
              <a href="">
                <YouTube />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="box_2">
        <div className="cont cont1">
          <h5>COMPANY NAME</h5>
          <p>
            Here you can use rows and columns to organize your footer content.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </p>
        </div>
        <div className="cont cont2">
          <h5>PRODUCTS</h5>
          <p>MDBootstrap</p>
          <p>MDWordPress</p>
          <p>BrandFlow</p>
          <p>Bootstrap Angular</p>
        </div>
        <div className="cont cont3">
          <h5>USEFUL LINKS</h5>
          <p>Your Account</p>
          <p>Become an Affiliate</p>
          <p>Shipping Rates</p>
          <p>Help</p>
        </div>
        <div className="cont cont4">
          <h5>CONTACT</h5>
          
            <Home fontSize="16px" />
            New York, NY 10012, US
          
          <p>
            <Email fontSize="16px" />
            info@example.com
          </p>
          <p>
            <Phone fontSize="16px"  />+ 01 234 567 88
          </p>
          <p>
            <Print fontSize="16px" />+ 01 234 567 89
          </p>
        </div>
      </div>
      <div className="box_3">© 2020 Copyright: MDBootstrap.com</div>
    </div>
  );
}

export default Footer;
