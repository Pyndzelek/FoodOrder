import { createContext, useContext, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { useState } from "react";
import type { Session } from "@supabase/supabase-js";

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: any; // Adjust type as needed
  isAdmin: boolean;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null); // Adjust type as needed
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchSession = async () => {
    const { data, error } = await supabase.auth.getSession();
    setSession(data.session);

    if (data.session) {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", data.session.user.id)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError.message);
        setProfile(null);
      } else {
        setProfile(profileData);
        // Check if the user is an admin
        setIsAdmin(profileData.group === "ADMIN"); // Adjust based on your role field
      }
    }

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
    <AuthContext.Provider value={{ session, loading, profile, isAdmin }}>
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
