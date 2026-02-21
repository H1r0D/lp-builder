'use client';

import { createContext, useContext, useEffect, useState, useRef } from 'react';
import type { User } from '@supabase/supabase-js';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { Profile, Database } from '@/types/database';

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
    refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    profile: null,
    isLoading: true,
    signOut: async () => { },
    refreshProfile: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const supabaseRef = useRef<SupabaseClient<Database> | null>(null);

    // クライアントを遅延初期化（SSR/SSG時には実行しない）
    const getSupabase = () => {
        if (!supabaseRef.current) {
            const { createClient } = require('@/lib/supabase/client');
            supabaseRef.current = createClient();
        }
        return supabaseRef.current!;
    };

    useEffect(() => {
        const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

        // 環境変数が未設定の場合はローディングを解除して早期リターン
        if (!url || !key) {
            setIsLoading(false);
            return;
        }

        const supabase = getSupabase();

        const fetchProfile = async (userId: string) => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', userId)
                    .single();
                if (error && error.code !== 'PGRST116') {
                    console.error('Profile fetch error:', error);
                }
                setProfile(data as Profile | null);
            } catch (err) {
                console.error('Profile fetch exception:', err);
            }
        };

        // 初期セッション取得
        const getSession = async () => {
            try {
                const { data: { user }, error } = await supabase.auth.getUser();
                if (error) {
                    console.error('Get user error:', error);
                }
                setUser(user);
                if (user) {
                    await fetchProfile(user.id);
                }
            } catch (err) {
                console.error('Get session exception:', err);
            } finally {
                setIsLoading(false);
            }
        };

        getSession();

        // Auth 状態変化のリスナー
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            async (_event, session) => {
                const currentUser = session?.user ?? null;
                setUser(currentUser);
                if (currentUser) {
                    await fetchProfile(currentUser.id);
                } else {
                    setProfile(null);
                }
                setIsLoading(false);
            }
        );

        return () => subscription.unsubscribe();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const signOut = async () => {
        const supabase = getSupabase();
        await supabase.auth.signOut();
        setUser(null);
        setProfile(null);
    };

    const refreshProfile = async () => {
        if (user) {
            const supabase = getSupabase();
            const { data } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.id)
                .single();
            setProfile(data as Profile | null);
        }
    };

    return (
        <AuthContext.Provider value={{ user, profile, isLoading, signOut, refreshProfile }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
