import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const portalRoot = document.getElementById('docs-root');

class Portal extends Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
  }

  componentDidMount() {
    portalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    portalRoot.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    const { el } = this;
    return createPortal(children, el);
  }
}

Portal.propTypes = {
  children: PropTypes.node.isRequired
};

export default Portal;
