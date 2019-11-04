import React from 'react';
import PropTypes from 'prop-types';
import cns from 'classnames';
import { Card, Image } from 'react-bootstrap';

const PetCard = (props) => {
  const {
    pet: {
      image, name, breed, age, sex, bio,
    } = {},
    onClick,
    isPreview,
  } = props;
  const infoList = [];
  if (breed) {
    infoList.push(breed);
  }
  if (sex) {
    infoList.push(sex);
  }
  if (age) {
    infoList.push(age);
  }
  const infoString = infoList.join(' | ');
  const src = `data:image/jpeg;base64,${image}`;
  return (
    <div className={cns('pet-card-container', { 'col-12 col-sm-4': isPreview })}>
      <Card className="pet-card" onClick={onClick}>
        {!!isPreview && (
        <div className="card-overlay">
          {`Click to learn more about ${name}!`}
        </div>
        )}
        <Card.Header as="h5">
          {name}
        </Card.Header>
        <Card.Body>
          <div className="pet-card-image-container">
            <Image src={src} className="pet-card-image" rounded />
          </div>
          {!isPreview && (
            <div className="info-container">
              <div className="info-string">
                {infoString}
              </div>
              {/* {!!breed && (
              <p>
                <span className="label">
                  Breed:
                  <span className="info-item">{breed}</span>
                </span>

              </p>
              )}
              {!!sex && (
              <p>
                <span className="label">
                  Sex:
                  <span className="info-item">{sex}</span>
                </span>
              </p>
              )}
              {!!age && (
              <p>
                <span className="label">
                  Age:
                  <span className="info-item">{age}</span>
                </span>
              </p>
              )} */}
              {
                !!bio && (
                  <p>
                    <span className="label">{`About ${name}:`}</span>
                    {bio}
                  </p>
                )
              }
            </div>
          )}
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
  onClick: PropTypes.func,
  isPreview: PropTypes.bool,
};
PetCard.defaultProps = {
  pet: {
    image: null,
    name: '',
    sex: '',
    age: '',
    bio: '',
  },
  onClick: null,
  isPreview: true,
};

export default PetCard;
