import React from 'react';
import { useParams } from 'react-router-dom';

//Bruh I got no idea what's going on this code, all I know is that it enabled me to get the parameter in the URL
 
const withRouter = WrappedComponent => props => {
  const params = useParams();
 
  return (
    <WrappedComponent
      {...props}
      params={params}
    />
  );
};
 
export default withRouter;