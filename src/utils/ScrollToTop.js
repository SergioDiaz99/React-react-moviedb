import { useEffect } from "react";
import { withRouter } from "react-router-dom";

export const documentScrollTop = () => {
  document.getElementsByTagName("html")[0].scrollTop = 0;
};

function ScrollToTop() {
  console.log('document scrolled to top');
  useEffect(() => {
    documentScrollTop();
  }, []);
  return null;
}

export default withRouter(ScrollToTop);