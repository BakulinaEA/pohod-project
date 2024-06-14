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
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

import { register } from '@/lib/api'

const formSchema = z
  .object({
    username: z.string().min(1, {
      message: 'Введите имя пользователя'
    }),
    email: z.string().email({
      message: 'Введите адрес электронной почты'
    }),
    password: z.string().min(6, {
      message: 'Пароль должен быть больше 6 символов'
    }),
    confirmPassword: z.string().min(6, {
      message: 'Пароль должен быть больше 6 символов'
    })
  })
  .refine(
    (data) => {
      return data.password == data.confirmPassword
    },
    {
      message: 'Пароли не совпадают',
      path: ['confirmPassword']
    }
  )

const Register = () => {
  const navigate = useNavigate()
  const {
    mutate: createAccount,
    isPending,
    isError,
    error
  } = useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate('/', {
        replace: true
      })
    }
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await createAccount(data)
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader className="">
          <CardTitle className="text-center text-xl">Регистрация</CardTitle>
        </CardHeader>

        <CardContent className="pb-1">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid w-full items-center gap-4"
            >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-y-2">
                    <FormLabel>Имя</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите имя" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Подтвердите пароль</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Подтвердите пароль"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
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
                  'Создать аккаунт'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="text-center flex flex-col">
          <Link
            to="/login"
            className="mt-3.5 mb-2 text-sm text-blue-500 hover:underline"
          >
            У меня есть аккаунт
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Register
