import React from 'react';
import { Typography } from '@material-ui/core';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Made with ❤️
      {' '}
      {/* {'Copyright © '} */}
        by Team SilentCoders
      {' '}
      {/* {new Date().getFullYear()} */}
    </Typography>
  );
}

export default Copyright;