import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import BlogEntryDisplay from './BlogEntryDisplay';

const BlogList = (props) => {
  const { blogs, onLoadMore } = props;
  return (
    <div className="blog-list col-xs-12 col-sm-8">
      {blogs.map((blog, i) => <BlogEntryDisplay key={`blog-post-${blog.title}`} blog={blog} index={i} />)}
      {blogs.length % 10 === 0 && <Button onClick={onLoadMore}>Load More</Button>}
    </div>
  );
};

BlogList.propTypes = {
  onLoadMore: PropTypes.func,
  blogs: PropTypes.array,
};

BlogList.defaultProps = {
  onLoadMore: () => {},
  blogs: [],
};
export default BlogList;
