import "../../css/components/Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="box_1">
        <div>Get connected with us on social networks:</div>
        <div className="list">
          <ul>
            <li><a href=""><img src="" alt="Item1" /></a></li>
            <li><a href=""><img src="" alt="Item2" /></a></li>
            <li><a href=""><img src="" alt="Item3" /></a></li>
            <li><a href=""><img src="" alt="Item4" /></a></li>
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
          <p>
            <img src="" alt="city" />
            New York, NY 10012, US
          </p>
          <p>
            <img src="" alt="mail" />
            info@example.com
          </p>
          <p>
            <img src="" alt="num" />+ 01 234 567 88
          </p>
          <p>
            <img src="" alt="print" />+ 01 234 567 89
          </p>
        </div>
      </div>
      <div className="box_3">© 2020 Copyright: MDBootstrap.com</div>
    </div>
  );
}

export default Footer;
