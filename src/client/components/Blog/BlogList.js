import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import BlogEntryDisplay from './BlogEntryDisplay';

const BlogList = (props) => {
  const { blogs, onLoadMore, hideLoadMore } = props;
  return (
    <div className="blog-list col-12">
      <div className="row blogs-page-title">
        <h4>Recent Posts</h4>
      </div>
      {blogs.map((blog) => (
        <BlogEntryDisplay key={`blog-post-${blog.title}`} blog={blog} />
      ))}
      {!hideLoadMore && (
        <div className="row button-row">
          <Button className="load-more-blogs-button" onClick={onLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

BlogList.propTypes = {
  onLoadMore: PropTypes.func,
  blogs: PropTypes.array,
  hideLoadMore: PropTypes.bool,
};

BlogList.defaultProps = {
  onLoadMore: () => {},
  blogs: [],
  hideLoadMore: true,
};
export default BlogList;
