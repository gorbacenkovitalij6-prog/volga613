import { redirect } from 'next/navigation'
import { cookies } from 'next/headers'
import { logout } from './login/actions'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AdminDashboardPage() {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get('admin_session')?.value

    if (sessionCookie !== 'authenticated') {
        redirect('/admin/login')
    }

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">Панель управления</h1>
                <div className="flex gap-4">
                    <Button asChild variant="outline">
                        <Link href="/">На сайт</Link>
                    </Button>
                    <form action={logout}>
                        <Button variant="destructive" type="submit">Выйти</Button>
                    </form>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 bg-card text-card-foreground rounded-lg border shadow-sm space-y-4">
                    <h2 className="text-xl font-semibold">Автомобили</h2>
                    <p className="text-muted-foreground">Управление каталогом автомобилей в наличии и под заказ.</p>
                    <Button asChild className="w-full">
                        <Link href="/admin/cars">Перейти к автомобилям</Link>
                    </Button>
                </div>

                <div className="p-6 bg-card text-card-foreground rounded-lg border shadow-sm space-y-4">
                    <h2 className="text-xl font-semibold">Отзывы</h2>
                    <p className="text-muted-foreground">Модерация готовых и публикация новых отзывов.</p>
                    <Button asChild className="w-full">
                        <Link href="/admin/reviews">Перейти к отзывам</Link>
                    </Button>
                </div>

                <div className="p-6 bg-card text-card-foreground rounded-lg border shadow-sm space-y-4">
                    <h2 className="text-xl font-semibold">Видеоотзывы</h2>
                    <p className="text-muted-foreground">Добавление и удаление видеоотзывов клиентов.</p>
                    <Button asChild className="w-full" variant="secondary">
                        <Link href="/admin/video-reviews">Перейти к видеоотзывам</Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
