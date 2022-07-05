import reactDom from "react-dom";

function Portal({ children }) {
  return reactDom.createPortal(children, document.getElementById("portal"));
}

export default Portal;
