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

const Registration = () => {
  useEffect(() => {
    document.title = 'Регистрация | Pohod-Project'
  })

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="">
          <CardTitle className="text-center text-xl">Регистрация</CardTitle>
        </CardHeader>
        <CardContent className="pb-1">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-2">
                <Label htmlFor="name">Имя</Label>
                <Input type="text" id="name" placeholder="Введите имя" />
              </div>
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
              <div className="flex flex-col space-y-2">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  placeholder="Подтвердите пароль"
                />
              </div>
            </div>
            <Button className="mt-4 w-full">Зарегистрироваться</Button>
          </form>
        </CardContent>
        <CardFooter className="text-center flex">
          <Link to="/login" className="mt-1.5 w-full ">
            <Button variant="link" className="text-blue-500">
              У меня есть аккаунт
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Registration
