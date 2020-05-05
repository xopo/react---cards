import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledImage = styled.img`
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
    transform: ${(props) => props.transform};
`;

const Card = ({ image, suit, value, transform}) => {
    return <StyledImage transform={transform} src={image} alt={`${value} of ${suit}`} />;
};


Card.propTypes = {
    code: PropTypes.string,
    image: PropTypes.string,
    suit: PropTypes.string,
    value: PropTypes.string
};


export default Card;
