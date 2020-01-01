import Button from './src/Button';
import Input from './src/Input';
import theme from './src/theme';
import withValue from './src/hoc/withValue';

const InputWithValue = withValue('string', Input);

const Picasso = { Button, Input, InputWithValue, theme };

export default Picasso;
