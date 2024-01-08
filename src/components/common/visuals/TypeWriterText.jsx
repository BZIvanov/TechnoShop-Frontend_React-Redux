import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typewriter from 'typewriter-effect';

const TypeWriterText = ({ texts }) => (
  <Paper
    sx={{
      color: (theme) => theme.palette.primary.main,
      padding: 1,
      textAlign: 'center',
      fontSize: 36,
    }}
  >
    <Typewriter options={{ strings: texts, autoStart: true, loop: true }} />
  </Paper>
);

TypeWriterText.propTypes = {
  texts: PropTypes.array,
};

export default TypeWriterText;
