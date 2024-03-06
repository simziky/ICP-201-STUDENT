import React from "react";
import { ToastContainer } from "react-toastify";
import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";

const Notification = () => (
  <ToastContainer
    position="bottom-center"
    autoClose={5000}
    hideProgressBar
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable={false}
    pauseOnHover
  />
);

const NotificationSuccess = ({ text }) => (
  <div>
    <i className="bi bi-check-circle-fill text-success mx-2" />
    <span className="text-secondary mx-1">{text}</span>
  </div>
);

const NotificationError = ({ text }) => (
  <div>
    <i className="bi bi-x-circle-fill text-danger mx-2" />
    <span className="text-secondary mx-1">{text}</span>
  </div>
);
const NotificationDanger = ({ text }) => (
  <div style={{display:"flex"}}>
    <div className="spinner-border text-danger" role="status"><span className=" sr-only"></span></div>
    <span className="text-secondary mx-1  text-danger">{text}</span>
  </div>
);

const Props = {
  text: PropTypes.string,
};

const DefaultProps = {
  text: "",
};

NotificationSuccess.propTypes = Props;
NotificationSuccess.defaultProps = DefaultProps;

NotificationDanger.propTypes = Props;
NotificationDanger.defaultProps = DefaultProps;

NotificationError.propTypes = Props;
NotificationError.defaultProps = DefaultProps;

export { Notification, NotificationSuccess, NotificationError, NotificationDanger };
