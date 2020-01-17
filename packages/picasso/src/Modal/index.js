import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.getElementById('docs-root');

class Modal extends React.Component {
  constructor(props) {
    super(props);

    this.container = document.createElement('div');
  }

  componentDidMount() {
    modalRoot.appendChild(this.container);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.container);
  }

  render() {
    const { children } = this.props;
    const { container } = this;
    return ReactDOM.createPortal(children, container);
  }
}

Modal.propTypes = {
  children: PropTypes.node.isRequired
};

export default Modal;
