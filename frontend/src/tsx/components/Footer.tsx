import "../../css/components/Footer.css";

import {
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "@mui/icons-material";

function Footer() {
  return (
    <div className="footer">
      <div className="box_1">
        <div className="firstfoot">Conéctate con nosotros en las redes sociales:</div>
        <div className="list">
          <ul className="socialmedia">
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
      <div className="box_3">© 2023 Copyright: WeeGig</div>
    </div>
  );
}

export default Footer;
