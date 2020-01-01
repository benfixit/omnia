import { get } from 'lodash';

const themeGet = (path, fallback = null) => props => {
  return get(props.theme, path, fallback);
};

export default themeGet;
