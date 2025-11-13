import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <Link to="/" className="btn">
        <span>Get Started</span>
      </Link>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn {
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    background: #fff;
    color: rgba(255, 0, 41, 1);
    font-family: "Montserrat", sans-serif;
    font-size: 1.125em;
    font-weight: 700;
    letter-spacing: 0.3em;
    padding: 18px 25px;
    text-decoration: none;
    overflow: hidden;
    cursor: pointer;
    transition: color 0.4s ease-in-out;
    z-index: 1;
  }

  .btn::after {
    content: "";
    position: absolute;
    width: 0%;
    height: 100%;
    background: rgba(255, 0, 41, 1);
    top: 0;
    left: 0;
    z-index: 0;
    transition: width 0.4s ease-in-out;
  }

  .btn:hover::after {
    width: 100%;
  }

  .btn span {
    position: relative;
    z-index: 1;
    transition: color 0.4s ease-in-out;
  }

  .btn:hover span {
    color: #ffffff;
  }
`;

export default Button;