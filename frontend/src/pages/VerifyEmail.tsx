import { useQuery } from '@tanstack/react-query'
import { useParams, Link } from 'react-router-dom'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Alert } from '@/components/ui/alert'
import { Label } from '@/components/ui/label'

import { Loader2, MailCheck, MailWarning } from 'lucide-react'

import { verifyEmail } from '@/lib/api'

const VerifyEmail = () => {
  const { code } = useParams()
  const { isPending, isSuccess } = useQuery({
    queryKey: ['emailVerification', code],
    queryFn: () => verifyEmail(code)
  })

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Card className="w-[350px] bg-inherit border-0 shadow-none">
        <CardHeader />
        <CardContent>
          {isPending ? (
            <Loader2 className="ml-auto mr-auto h-4 w-4 animate-spin" />
          ) : isSuccess ? (
            <Alert className="flex items-center">
              <div className="h-5 w-5">
                <MailCheck className="h-5 w-5" />
              </div>
              <Label className="ml-3">Почта подтверждена</Label>
            </Alert>
          ) : (
            <Alert variant="destructive" className="flex items-center bg-white">
              <div className="h-5 w-5">
                <MailWarning className="h-5 w-5" />
              </div>
              <Label className="ml-3">Не удалось подтвердить почту</Label>
            </Alert>
          )}
        </CardContent>
        <CardFooter className="text-center flex flex-col">
          <Link
            to="/"
            className="mt-3.5 mb-2 text-sm text-blue-500 hover:underline"
          >
            Перейти в панель управления
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default VerifyEmail
