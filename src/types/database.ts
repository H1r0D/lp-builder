// Supabase Database 型定義
// supabase/schema.sql に対応

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string;
                    email: string;
                    avatar_url: string | null;
                    display_name: string | null;
                    referral_code: string;
                    referred_by: string | null;
                    credits: number;
                    subscription_plan: 'free' | 'starter' | 'pro';
                    stripe_customer_id: string | null;
                    stripe_subscription_id: string | null;
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id: string;
                    email: string;
                    avatar_url?: string | null;
                    display_name?: string | null;
                    referral_code?: string;
                    referred_by?: string | null;
                    credits?: number;
                    subscription_plan?: 'free' | 'starter' | 'pro';
                    stripe_customer_id?: string | null;
                    stripe_subscription_id?: string | null;
                };
                Update: {
                    avatar_url?: string | null;
                    display_name?: string | null;
                    credits?: number;
                    subscription_plan?: 'free' | 'starter' | 'pro';
                    stripe_customer_id?: string | null;
                    stripe_subscription_id?: string | null;
                };
                Relationships: [];
            };
            projects: {
                Row: {
                    id: string;
                    user_id: string;
                    title: string;
                    json_content: Record<string, unknown>;
                    status: 'draft' | 'published';
                    slug: string | null;
                    thumbnail_url: string | null;
                    tags?: string[];
                    created_at: string;
                    updated_at: string;
                };
                Insert: {
                    id?: string;
                    user_id: string;
                    title?: string;
                    json_content?: Record<string, unknown>;
                    status?: 'draft' | 'published';
                    slug?: string | null;
                    thumbnail_url?: string | null;
                    tags?: string[];
                };
                Update: {
                    title?: string;
                    json_content?: Record<string, unknown>;
                    status?: 'draft' | 'published';
                    slug?: string | null;
                    thumbnail_url?: string | null;
                    tags?: string[];
                };
                Relationships: [
                    {
                        foreignKeyName: 'projects_user_id_fkey';
                        columns: ['user_id'];
                        isOneToOne: false;
                        referencedRelation: 'profiles';
                        referencedColumns: ['id'];
                    },
                ];
            };
            analytics: {
                Row: {
                    id: string;
                    project_id: string;
                    date: string;
                    views: number;
                    clicks: number;
                    referrer: string | null;
                    created_at: string;
                };
                Insert: {
                    id?: string;
                    project_id: string;
                    date?: string;
                    views?: number;
                    clicks?: number;
                    referrer?: string | null;
                };
                Update: {
                    views?: number;
                    clicks?: number;
                };
                Relationships: [
                    {
                        foreignKeyName: 'analytics_project_id_fkey';
                        columns: ['project_id'];
                        isOneToOne: false;
                        referencedRelation: 'projects';
                        referencedColumns: ['id'];
                    },
                ];
            };
        };
        Views: Record<string, never>;
        Functions: Record<string, never>;
        Enums: Record<string, never>;
        CompositeTypes: Record<string, never>;
    };
}

// 便利な型エイリアス
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Project = Database['public']['Tables']['projects']['Row'];
export type Analytics = Database['public']['Tables']['analytics']['Row'];
export type ProjectInsert = Database['public']['Tables']['projects']['Insert'];
export type ProjectUpdate = Database['public']['Tables']['projects']['Update'];
