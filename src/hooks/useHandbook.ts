import { useEffect, useState } from 'react';
import {
  fetchHandbook,
  isHandbookProgram,
  type HandbookData,
} from '@/lib/handbook';

export function useHandbook(programCode: string | null) {
  const [data, setData] = useState<HandbookData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!programCode || !isHandbookProgram(programCode)) {
      setData(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetchHandbook(programCode)
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setData(null);
          setError(err instanceof Error ? err.message : 'Failed to load handbook data');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [programCode]);

  return { handbook: data, loading, error };
}
