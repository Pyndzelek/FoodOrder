import { createContext, useContext, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import type { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  loading: boolean;
};

const AuthContext = createContext<AuthData>({ session: null, loading: true });

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    setSession(data.session);
    setLoading(false);
    if (error) {
      console.error("Error fetching session:", error.message);
    }
  };
  useEffect(() => {
    fetchSession();
    supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ session, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
