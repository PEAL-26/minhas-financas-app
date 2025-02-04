import { useEffect, useState } from 'react';

export function useLoadingPage(wait = 500) {
  const [isLoadingPage, setIsLoadingPage] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoadingPage(false), wait);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { isLoadingPage };
}
