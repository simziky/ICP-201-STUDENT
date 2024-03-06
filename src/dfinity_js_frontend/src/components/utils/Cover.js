import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import "./cover.css"

const Cover = ({ title, login, coverImg, subTitle }) => {
  if ((title, login, coverImg)) {
    return (
      <div className="cover-main ">
        <div className=" cover-inner">
          
         <div className="inner-sec1">
         <h1>{title}</h1>
         <h2>{subTitle}</h2>
        
          <p>Please connect your wallet to continue.</p>
          <Button
            onClick={login}
            variant="outline-light"
            className="rounded-pill px-3 mt-3"
          >
            Connect Wallet
          </Button>
         </div>

         <div className="inner-sec2">
          <img src={coverImg} />
         </div>
         <p className="powered">Powered by Internet Computer</p>
        </div>
       
      </div>
    );
  }
  return null;
};

Cover.propTypes = {
  title: PropTypes.string,
};

Cover.defaultProps = {
  title: "",
};

export default Cover;
