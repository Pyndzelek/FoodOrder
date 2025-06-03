import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase"; // Ensure this path is correct
import type { Session, User } from "@supabase/supabase-js";

// type Profile = {
//   id: string;
//   username: string;
//   avatar_url?: string;
//   group: "ADMIN" | "USER" | string; // Be as specific as possible
//   // other profile fields
// };

type AuthData = {
  session: Session | null;
  loading: boolean;
  profile: any; // Replace 'any' with your Profile type if defined
  isAdmin: boolean;
  user: User | null; // Exposing the user object can be useful
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
  user: null,
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any>(null); // Replace 'any' with your Profile type
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Helper function to fetch user profile
    const fetchUserProfile = async (userId: string) => {
      // ... (rest of fetchUserProfile function remains the same)
      if (!userId) {
        setProfile(null);
        return;
      }
      try {
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userId)
          .single();

        if (profileError) {
          console.error("Error fetching profile:", profileError.message);
          setProfile(null);
        } else {
          setProfile(profileData);
        }
      } catch (e) {
        console.error("Exception fetching profile:", e);
        setProfile(null);
      }
    };

    // 1. Fetch initial session and profile
    const initializeAuth = async () => {
      // ... (rest of initializeAuth function remains the same)
      try {
        const {
          data: { session: currentSession },
          error: sessionError,
        } = await supabase.auth.getSession();

        if (sessionError) {
          console.error(
            "Error fetching initial session:",
            sessionError.message
          );
          setSession(null);
          setUser(null);
          setProfile(null);
        } else {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          if (currentSession?.user) {
            await fetchUserProfile(currentSession.user.id);
          } else {
            setProfile(null);
          }
        }
      } catch (e) {
        console.error("Unexpected error during auth initialization:", e);
        setSession(null);
        setUser(null);
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // 2. Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      // Correctly destructure here
      async (event, newSession) => {
        console.log("Auth event:", event, "New session:", newSession);
        setLoading(true);
        setSession(newSession);
        setUser(newSession?.user ?? null);

        if (newSession?.user) {
          await fetchUserProfile(newSession.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    // Cleanup listener on component unmount
    return () => {
      subscription?.unsubscribe(); // Call unsubscribe on the subscription object
    };
  }, []); // Empty dependency array ensures this runs once on mount

  const isAdmin = profile?.group === "ADMIN";

  return (
    <AuthContext.Provider value={{ session, loading, profile, isAdmin, user }}>
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
