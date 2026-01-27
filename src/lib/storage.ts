// localStorage操作ユーティリティ
import type { LP } from '@/types/lp';

const LP_STORAGE_KEY = 'lp-builder-lps';
const AUTH_STORAGE_KEY = 'lp-builder-auth';

// 認証関連
export const auth = {
    login: (email: string, password: string): boolean => {
        // ダミー認証 (固定値)
        if (email === 'demo@example.com' && password === 'demo1234') {
            if (typeof window !== 'undefined') {
                localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ isLoggedIn: true, email }));
            }
            return true;
        }
        return false;
    },

    logout: (): void => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem(AUTH_STORAGE_KEY);
        }
    },

    isLoggedIn: (): boolean => {
        if (typeof window === 'undefined') return false;
        const auth = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!auth) return false;
        try {
            return JSON.parse(auth).isLoggedIn === true;
        } catch {
            return false;
        }
    },

    getEmail: (): string | null => {
        if (typeof window === 'undefined') return null;
        const auth = localStorage.getItem(AUTH_STORAGE_KEY);
        if (!auth) return null;
        try {
            return JSON.parse(auth).email || null;
        } catch {
            return null;
        }
    }
};

// LP一覧の操作
export const lpStorage = {
    getAll: (): LP[] => {
        if (typeof window === 'undefined') return [];
        const data = localStorage.getItem(LP_STORAGE_KEY);
        if (!data) return [];
        try {
            return JSON.parse(data);
        } catch {
            return [];
        }
    },

    getById: (id: string): LP | null => {
        const lps = lpStorage.getAll();
        return lps.find(lp => lp.id === id) || null;
    },

    save: (lp: LP): void => {
        const lps = lpStorage.getAll();
        const index = lps.findIndex(l => l.id === lp.id);
        if (index >= 0) {
            lps[index] = { ...lp, updatedAt: new Date().toISOString() };
        } else {
            lps.push(lp);
        }
        if (typeof window !== 'undefined') {
            localStorage.setItem(LP_STORAGE_KEY, JSON.stringify(lps));
        }
    },

    delete: (id: string): void => {
        const lps = lpStorage.getAll().filter(lp => lp.id !== id);
        if (typeof window !== 'undefined') {
            localStorage.setItem(LP_STORAGE_KEY, JSON.stringify(lps));
        }
    },

    duplicate: (id: string): LP | null => {
        const original = lpStorage.getById(id);
        if (!original) return null;

        const newId = `lp_${Date.now()}`;
        const now = new Date().toISOString();
        const duplicated: LP = {
            ...original,
            id: newId,
            title: `${original.title} (コピー)`,
            status: 'draft',
            createdAt: now,
            updatedAt: now,
        };
        lpStorage.save(duplicated);
        return duplicated;
    }
};

// ユニークID生成
export const generateId = (): string => {
    return `lp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const generateSectionId = (): string => {
    return `sec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};
