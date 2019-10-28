import React, { PureComponent } from 'react';
import { Promise as BluebirdPromise } from 'bluebird';
import { Spinner, Tabs, Tab } from 'react-bootstrap';
import EventList from './EventList';
import BlogList from './BlogList';
import { unauthenticatedFetch } from '../../utils/fetchUtils';

export default class BlogPage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      blogs: [],
      loading: true,
      hideLoadMore: false,
    };
  }

  componentDidMount() {
    const promises = [unauthenticatedFetch('/events/all'), unauthenticatedFetch('/blogs/next?page=0')];
    return BluebirdPromise.all(promises)
      .spread(({ events }, { blogs }) => this.setState({
        events, blogs, loading: false, hideLoadMore: blogs.length < 10,
      }));
  }

  handleLoadMoreBlogs = () => {
    const { blogs } = this.state;
    const page = Math.floor(blogs.length / 10);
    return unauthenticatedFetch(`/blogs/next?page=${page}`).then(({ blogs: retrievedBlogs }) => {
      this.setState((prevState) => {
        const blogList = [...prevState.blogs, ...retrievedBlogs];
        return { blogs: blogList, hideLoadMore: retrievedBlogs.length < 10 };
      });
    });
  }

  render() {
    const {
      events, blogs, loading, hideLoadMore,
    } = this.state;
    return (
      <div className="container blog-page">
        <Tabs defaultActiveKey="blog" id="uncontrolled-tab-example">
          <Tab eventKey="blog" title="Blog">
            {!loading && <BlogList blogs={blogs} hideLoadMore={hideLoadMore} />}
          </Tab>
          <Tab eventKey="events" title="Events">
            {!loading && <EventList events={events} />}
          </Tab>
        </Tabs>
        {!!loading && (
          <Spinner animation="border" role="status" className="loading-spinner">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </div>
    );
  }
}
