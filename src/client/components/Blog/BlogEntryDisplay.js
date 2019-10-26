import React from 'react';
import PropTypes from 'prop-types';
import { Card, Accordion } from 'react-bootstrap';
import { format } from 'date-fns';

const BlogEntryDisplay = (props) => {
  const {
    blog: {
      title, body, createdOn,
    } = {},
    index,
  } = props;
  const date = createdOn ? format(new Date(createdOn), 'MMM do, yyyy h:mm aa') : null;

  return (
    <Accordion>
      <Card>
        <Accordion.Toggle as={Card.Header} eventKey={index}>
          {title}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={index}>
          <Card.Body>
            <div className="blog-date">
              Posted by East Haven Animal Shelter
              {date ? ` on ${date}` : ''}
            </div>
            <p className="blog-description">{body}</p>
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
