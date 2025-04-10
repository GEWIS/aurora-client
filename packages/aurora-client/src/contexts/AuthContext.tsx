import { createContext, PropsWithChildren, useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ApiKeyParameters, authKey, AuthUser, getInformation } from '../api';

interface IAuthContext {
  user: AuthUser | null;
  loading: boolean;
}

const defaultContext: IAuthContext = {
  user: null,
  loading: true,
};

export const AuthContext = createContext(defaultContext);

export default function AuthContextProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [urlSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const authenticate = useCallback(async () => {
    if (urlSearchParams.has('key')) {
      const key = urlSearchParams.get('key');
      const body: ApiKeyParameters = { key: key ?? '' };
      const auth = await authKey({ body });
      // TODO what to do if user cannot be authenticated
      setUser(auth.data!);
    } else {
      const info = await getInformation();
      setUser(info.data!);
    }
  }, [urlSearchParams]);

  useEffect(() => {
    authenticate()
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [authenticate]);

  useEffect(() => {
    if (user && urlSearchParams.has('key')) {
      navigate('');
    }
  }, [navigate, urlSearchParams, user]);

  const context = useMemo(
    (): IAuthContext => ({
      user,
      loading,
    }),
    [user, loading],
  );

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
}
