import { useEffect, useRef } from 'react';

// * Use this in case you don't want the effect to run in the first render of a component.
const useEffectAfterMount = (cb, dependencies) => {
  const mounted = useRef(false);

  useEffect(() => {
    if (mounted.current) {
      return cb();
    }
    mounted.current = true;
  }, dependencies);
};

export { useEffectAfterMount };
