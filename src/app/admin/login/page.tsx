import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
};

export default async function LoginPage(props: Props) {
    const searchParams = await props.searchParams;
    const error = searchParams?.error as string | undefined;

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
            <Card className="w-full max-w-md shadow-lg border-primary/20">
                <CardHeader className="space-y-1 text-center">
                    <CardTitle className="text-2xl font-bold tracking-tight">Вход в Админ-панель</CardTitle>
                    <CardDescription>Введите логин и пароль для доступа к системе</CardDescription>
                </CardHeader>
                <form action={login}>
                    <CardContent className="space-y-4">
                        {error && (
                            <div className="bg-destructive/15 text-destructive text-sm p-3 rounded-md font-medium text-center">
                                Неверный логин или пароль
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="login">Логин</Label>
                            <Input id="login" name="login" type="text" placeholder="admin" required autoFocus />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Пароль</Label>
                            <Input id="password" name="password" type="password" required />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" type="submit">
                            Войти
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}
