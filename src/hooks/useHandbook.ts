import { useEffect, useState } from 'react';
import {
  fetchHandbook,
  isHandbookProgram,
  type HandbookData,
} from '@/lib/handbook';

type HandbookState = {
  program: string | null;
  data: HandbookData | null;
  loading: boolean;
  error: string | null;
};

const idleState: HandbookState = {
  program: null,
  data: null,
  loading: false,
  error: null,
};

export function useHandbook(programCode: string | null) {
  const enabled = Boolean(programCode && isHandbookProgram(programCode));
  const [state, setState] = useState<HandbookState>(idleState);

  useEffect(() => {
    if (!enabled || !programCode) return;

    let cancelled = false;

    fetchHandbook(programCode)
      .then((result) => {
        if (!cancelled) {
          setState({
            program: programCode,
            data: result,
            loading: false,
            error: null,
          });
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setState({
            program: programCode,
            data: null,
            loading: false,
            error: err instanceof Error ? err.message : 'Failed to load handbook data',
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [enabled, programCode]);

  if (!enabled) {
    return { handbook: null, loading: false, error: null };
  }

  if (state.program !== programCode) {
    return { handbook: null, loading: true, error: null };
  }

  return {
    handbook: state.data,
    loading: state.loading,
    error: state.error,
  };
}
