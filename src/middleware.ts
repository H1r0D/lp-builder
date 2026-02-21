import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// 認証不要のパス
const PUBLIC_PATHS = ['/login', '/signup', '/auth/callback'];

export async function middleware(request: NextRequest) {
    // 環境変数未設定時はスキップ
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        return NextResponse.next({ request });
    }

    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    // セッションのリフレッシュ（重要: getUser でトークンを検証）
    const { data: { user } } = await supabase.auth.getUser();

    const { pathname } = request.nextUrl;

    // 公開パスかどうか
    const isPublicPath = PUBLIC_PATHS.some((p) => pathname.startsWith(p));

    // 未認証 → 保護されたページにアクセス → ログインへリダイレクト
    if (!user && !isPublicPath && pathname !== '/') {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // 認証済み → ログイン/サインアップページにアクセス → ダッシュボードへ
    if (user && isPublicPath) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}

export const config = {
    matcher: [
        // API routes, static files, favicon を除外
        '/((?!_next/static|_next/image|favicon.ico|api/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};
