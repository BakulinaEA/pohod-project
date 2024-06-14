import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import { Alert, AlertDescription } from '@/components/ui/alert'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

import { login } from '@/lib/api'

const formSchema = z.object({
  email: z.string().email({
    message: 'Введите адрес электронной почты'
  }),
  password: z.string().min(6, {
    message: 'Пароль должен быть больше 6 символов'
  })
})

const Login = () => {
  const navigate = useNavigate()
  const {
    mutate: signIn,
    isPending,
    isError,
    error
  } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate('/', {
        replace: true
      })
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await signIn(data)
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="">
          <CardTitle className="text-center text-xl">Авторизуйтесь</CardTitle>
        </CardHeader>

        <CardContent className="pb-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full items-center gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Почта</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите почту" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Введите пароль"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                    <Link
                      to="/resetpassword"
                      className="text-blue-500 text-sm hover:underline w-full"
                    >
                      <Label>Забыли пароль?</Label>
                    </Link>
                  </FormItem>
                )}
              />
              {isError && (
                <Alert variant="destructive">
                  <AlertDescription className="text-sm">
                    {error?.message || 'Что-то пошло не так...'}
                  </AlertDescription>
                </Alert>
              )}
              <Button className="mt-1.5" type="submit">
                {isPending ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  'Войти'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center flex flex-col">
          <Link
            to="/register"
            className="mt-3.5 mb-2 text-sm text-blue-500 hover:underline"
          >
            Создать аккаунт
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Login
