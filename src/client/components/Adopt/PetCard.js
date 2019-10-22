import React from 'react';
import PropTypes from 'prop-types';
import { Card, Image } from 'react-bootstrap';

const PetCard = (props) => {
  const {
    pet: {
      image, name, breed, age, bio, sex,
    } = {},
  } = props;
  const src = `data:image/jpeg;base64,${image}`;
  return (
    <div className="pet-card-container col-xs-12 col-sm-4">
      <Card className="pet-card">
        <Card.Header as="h5">
          {name}
        </Card.Header>
        <Card.Body>
          <div className="pet-card-image-container">
            <Image src={src} className="pet-card-image" rounded responsive />
          </div>
          {!!breed && <p>{`Breed: ${breed}`}</p>}
          {!!sex && <p>{`Sex: ${sex}`}</p>}
          {!!age && (
          <p>
            {`Age: ${age}`}
          </p>
          )}
          <p>{bio}</p>
        </Card.Body>
      </Card>
    </div>
  );
};

PetCard.propTypes = {
  pet: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    sex: PropTypes.string,
    age: PropTypes.string,
    bio: PropTypes.string,
  }),
};
PetCard.defaultProps = {
  pet: {
    image: null,
    name: '',
    sex: '',
    age: '',
    bio: '',
  },
};

export default PetCard;
