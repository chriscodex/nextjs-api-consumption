import { useState } from 'react';

function useAlert() {
  const [alert, setAlert] = useState(false);

  return {
    alert,
    setAlert,
  };
}

export default useAlert;
