import React from "react";
import { useLocation } from "react-router-dom";

function Footer() {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [footerElement, setFooterElement] = React.useState(<></>)

  React.useEffect(() => {
    if (location.pathname === "/signup") {
      setFooterElement(<></>)
    } else if (location.pathname === "/login") {
      setFooterElement(<></>)
    } else {
      setFooterElement(
        <footer className="footer">
          <p className="footer__copyright">&copy; {currentYear} Mesto Russia</p>
        </footer>
      );
    };
  }, [location]);

  return (
    <>{footerElement}</>
  )
}

export default Footer;