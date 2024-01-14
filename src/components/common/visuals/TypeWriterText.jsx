import PropTypes from 'prop-types';
import Paper from '@mui/material/Paper';
import Typewriter from 'typewriter-effect';

const TypeWriterText = ({ texts, styles }) => (
  <Paper
    sx={{
      color: (theme) => theme.palette.primary.main,
      padding: 1,
      textAlign: 'center',
      fontSize: 36,
      ...styles,
    }}
  >
    <Typewriter options={{ strings: texts, autoStart: true, loop: true }} />
  </Paper>
);

TypeWriterText.propTypes = {
  texts: PropTypes.array.isRequired,
  styles: PropTypes.object,
};

export default TypeWriterText;
