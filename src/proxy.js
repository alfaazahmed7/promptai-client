import { NextResponse } from 'next/server'
import { getUserSession } from './lib/core/session'

export async function proxy(request) {
    const session = await getUserSession();

    if (!session) {
        return NextResponse.redirect(new URL('/sign-in', request.url))
    }
}

export const config = {
    matcher: [
        '/all-prompts/:path',
        '/dashboard',
        '/pricing',
    ]
}