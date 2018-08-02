import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component
{
    componentDidUpdate(prevProps)
    {
        if (this.props.location !== prevProps.location)
        {
            window.scrollTo(0, 0)
        }
        // if the previous url is not same with the new url, then scroll to the top
    }

    render() 
    {
      return this.props.children
    }
}
export default withRouter(ScrollToTop)
// this component was added because when I want to go to productdetail from home.js, the page will open but showing the middle of the page, not at the top
// the component called in index.js