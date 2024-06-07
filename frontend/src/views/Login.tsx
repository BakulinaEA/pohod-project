import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const Login = () => {
  useEffect(() => {
    document.title = 'Авторизация | Pohod-Project'
  })

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="">
          <CardTitle className="text-center text-xl">Авторизуйтесь</CardTitle>
        </CardHeader>
        <CardContent className="pb-1">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="email">Почта</Label>
                <Input type="email" id="email" placeholder="Введите почту" />
              </div>
              <div className="flex flex-col space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Введите пароль"
                />
              </div>
            </div>
            <Button className="mt-4 w-full">Войти</Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex">
          <Link to="/register" className="mt-1.5 w-full ">
            <Button variant="link" className="text-blue-500">
              Создать аккаунт
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
