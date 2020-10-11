import React, { useContext } from 'react';

import AuthContext from '../contexts/AuthContext';

import PrivateStack from './PrivateStack';
import PublicStack from './PublicStack';

function Stacks() {  
  const { isValidToken } = useContext(AuthContext);

  return isValidToken ? <PrivateStack /> : <PublicStack />;
}

export default Stacks;