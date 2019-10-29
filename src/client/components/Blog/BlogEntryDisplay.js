import React from 'react';
import PropTypes from 'prop-types';
import { Card, Accordion, Carousel } from 'react-bootstrap';
import { format } from 'date-fns';


const BlogEntryDisplay = (props) => {
  const {
    blog: {
      title, body, createdOn, images = [],
    } = {},
    index,
  } = props;
  const date = createdOn ? format(new Date(createdOn), 'MMM do, yyyy h:mm aa') : null;
  const defaultActiveKey = index === 0 ? 0 : null;

  return (
    <Accordion className="blog-accordion" defaultActiveKey={defaultActiveKey}>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={index}>
          {title}
          <div className="blog-date">
            Posted by East Haven Animal Shelter
            {date ? ` on ${date}` : ''}
          </div>
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={index}>
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
            <div className="html-content" dangerouslySetInnerHTML={{ __html: body }} />
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
};


BlogEntryDisplay.propTypes = {
  blog: PropTypes.object,
  index: PropTypes.number,
};

BlogEntryDisplay.defaultProps = {
  blog: {},
  index: null,
};

export default BlogEntryDisplay;
