import React, { PureComponent } from 'react';
import { Promise as BluebirdPromise } from 'bluebird';
import EventList from './EventList';
import BlogList from './BlogList';
import { unauthenticatedFetch } from '../../utils/fetchUtils';

export default class BlogPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      blogs: [],
    };
  }

  componentDidMount() {
    const promises = [unauthenticatedFetch('/events/all'), unauthenticatedFetch('/blogs/next?page=0')];
    return BluebirdPromise.all(promises)
      .spread(({ events }, { blogs }) => this.setState({ events, blogs }));
  }

  handleLoadMoreBlogs = () => {
    const { blogs } = this.state;
    const page = Math.floor(blogs.length / 10);
    return unauthenticatedFetch(`/blogs/next?page=${page}`);
  }

  render() {
    const { events, blogs } = this.state;
    return (
      <div className="container blog-page">
        <div className="row blogs-page-title">
          <h4>Recent Posts</h4>
        </div>
        <div className="blog-page-content">
          <BlogList blogs={blogs} />
          <EventList events={events} />
        </div>
      </div>
    );
  }
}
