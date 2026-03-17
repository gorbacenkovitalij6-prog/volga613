'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function login(formData: FormData) {
    const login = formData.get('login') as string
    const password = formData.get('password') as string

    const correctLogin = process.env.ADMIN_LOGIN || 'admin'
    const correctPassword = process.env.ADMIN_PASSWORD || 'admin'

    if (login === correctLogin && password === correctPassword) {
        const cookieStore = await cookies()
        cookieStore.set('admin_session', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
        })
        revalidatePath('/admin', 'layout')
        redirect('/admin')
    }

    redirect('/admin/login?error=1')
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete('admin_session')
    redirect('/admin/login')
}
