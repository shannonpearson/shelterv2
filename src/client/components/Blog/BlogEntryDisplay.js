import React from 'react';
import PropTypes from 'prop-types';
import { Card, Carousel } from 'react-bootstrap';
import { format } from 'date-fns';

const BlogEntryDisplay = (props) => {
  // eslint-disable-next-line object-curly-newline
  const { blog: { title, body, createdOn, images = [] } = {} } = props;
  const date = createdOn
    ? format(new Date(createdOn), 'MMM do, yyyy h:mm aa')
    : null;

  return (
    <Card>
      <Card.Header>
        <h4 className="blog-title col-12">{title}</h4>
        <div className="blog-date col-12">
          Posted by East Haven Animal Shelter
          {date ? ` on ${date}` : ''}
        </div>
      </Card.Header>
      <Card.Body>
        {images && images.length ? (
          <div className="carousel-container">
            <Carousel>
              {images.map((image) => (
                <Carousel.Item key={image.slice(-10)}>
                  <img
                    className="d-block"
                    src={`data:image/jpeg;base64,${image}`}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          </div>
        ) : null}
        <div
          className="html-content"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </Card.Body>
    </Card>
  );
};

BlogEntryDisplay.propTypes = {
  blog: PropTypes.object,
};

BlogEntryDisplay.defaultProps = {
  blog: {},
};

export default BlogEntryDisplay;
