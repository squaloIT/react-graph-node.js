import { useEffect, useState } from 'react';

const useObservable = (observable, errCallback, isSelfDependent) => {
  const [state, setState] = useState([]);

  useEffect(() => {
    const sub = observable.subscribe(setState, errCallback);
    return () => sub.unsubscribe();
  }, isSelfDependent ? [observable] : []);

  return state;
};

export { useObservable };
