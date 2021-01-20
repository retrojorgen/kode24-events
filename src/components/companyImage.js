import styled from "styled-components";
import React from "react";

const CompanyImageWrapper = styled.div`
  background-color: black;
  width: 70px;
  height: 70px;
  position: relative;
  margin-right: 20px;
  flex: 0 0 70px;
  background-image: url("${(props) =>
    props.background ? props.background : ""}");
  background-size: cover;
  border-radius: 10px;
  figure {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: cover !important;
    margin: 0;
    border-radius: 50%;
    overflow: hidden;
    img {
      max-width: 100%;
      overflow: hidden;
    }
  }
  @media (min-width: 700px) {
    width: 100px;
    height: 100px;
    flex: 0 0 100px;
  }
`;

export default (props) => (
  <CompanyImageWrapper
    className="listing-company-image"
    background={props.background}
  />
);
