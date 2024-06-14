import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserNav } from '@/components/user-nav'
import { Layout, LayoutBody } from '@/components/custom/layout'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

//https://github.com/satnaing/shadcn-admin/blob/main/src/components/user-nav.tsx
export default function Dashboard() {
  return (
    <Layout className="items-center h-full">
      <LayoutBody className="space-y-4">
        <div className="flex items-center justify-between ">
          <h1 className="text-xl font-bold tracking-tight">
            Панель управления
          </h1>
          <div className="flex items-center ">
            <UserNav />
          </div>
        </div>
        <Tabs
          orientation="vertical"
          defaultValue="newplan"
          className="space-y-4"
        >
          <div className="overflow-x-none pb-2">
            <TabsList>
              <TabsTrigger value="newplan">Организовать поход</TabsTrigger>
              <TabsTrigger value="history">История походов</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="newplan" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 h-full">
              <Card className="col-span-1 lg:col-span-3 h-full w-[640px] max-sm:w-[316px]">
                <CardHeader>
                  <CardTitle className="text-center text-xl">
                    Организация похода
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-1">
                  <form>
                    <div className="grid w-full items-center gap-4">
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="numPeoples">
                          Количество участников
                        </Label>
                        <Input
                          type="tel"
                          id="numPeoples"
                          placeholder="Введите количество участников"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="daysInTrip">
                          Продолжительность похода (дней)
                        </Label>
                        <Input
                          type="tel"
                          id="daysInTrip"
                          placeholder="Введите количество дней"
                        />
                      </div>
                      <div className="flex flex-col space-y-2">
                        <Label htmlFor="typeOfTrip">Вид похода</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Укажите вид похода" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Пеший">Пеший</SelectItem>
                            <SelectItem value="Водный">Водный</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <Button className="mt-4 w-full">Продолжить</Button>
                  </form>
                </CardContent>
                <CardFooter className="text-center flex" />
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <div className="grid grid-cols-1 gap-4 h-full">
              <Card className="col-span-1 lg:col-span-3 h-full w-[640px] max-sm:w-[316px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-xl">
                    05.06.2024
                  </CardTitle>
                  <CardDescription className="text-center">
                    Елизавета, Андрей, Арсений
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="grid items-center">
                    <div>
                      <Label htmlFor="numPeoples">Количество участников:</Label>
                      <Label htmlFor="numPeoples"> 3 </Label>
                    </div>
                    <div>
                      <Label htmlFor="daysInTrip">Продолжительность:</Label>
                      <Label htmlFor="daysInTrip"> 7 </Label>
                      <Label htmlFor="daysInTrip"> дней </Label>
                    </div>
                    <div>
                      <Label htmlFor="typeOfTrip">Вид похода:</Label>
                      <Label htmlFor="typeOfTrip"> Пеший </Label>
                    </div>
                  </div>
                  <Button variant="default" className="mt-4 w-full">
                    Смотреть отчёт
                  </Button>
                </CardContent>
                <CardFooter />
              </Card>
              <Card className="col-span-1 lg:col-span-3 h-full w-[640px] max-sm:w-[316px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-xl">
                    05.06.2024
                  </CardTitle>
                  <CardDescription className="text-center">
                    Елизавета, Андрей, Арсений
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="grid items-center">
                    <div>
                      <Label htmlFor="numPeoples">Количество участников:</Label>
                      <Label htmlFor="numPeoples"> 3 </Label>
                    </div>
                    <div>
                      <Label htmlFor="daysInTrip">Продолжительность:</Label>
                      <Label htmlFor="daysInTrip"> 7 </Label>
                      <Label htmlFor="daysInTrip"> дней </Label>
                    </div>
                    <div>
                      <Label htmlFor="typeOfTrip">Вид похода:</Label>
                      <Label htmlFor="typeOfTrip"> Пеший </Label>
                    </div>
                  </div>
                  <Button variant="default" className="mt-4 w-full">
                    Смотреть отчёт
                  </Button>
                </CardContent>
                <CardFooter />
              </Card>
              <Card className="col-span-1 lg:col-span-3 h-full w-[640px] max-sm:w-[316px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-xl">
                    05.06.2024
                  </CardTitle>
                  <CardDescription className="text-center">
                    Елизавета, Андрей, Арсений
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="grid items-center">
                    <div>
                      <Label htmlFor="numPeoples">Количество участников:</Label>
                      <Label htmlFor="numPeoples"> 3 </Label>
                    </div>
                    <div>
                      <Label htmlFor="daysInTrip">Продолжительность:</Label>
                      <Label htmlFor="daysInTrip"> 7 </Label>
                      <Label htmlFor="daysInTrip"> дней </Label>
                    </div>
                    <div>
                      <Label htmlFor="typeOfTrip">Вид похода:</Label>
                      <Label htmlFor="typeOfTrip"> Пеший </Label>
                    </div>
                  </div>
                  <Button variant="default" className="mt-4 w-full">
                    Смотреть отчёт
                  </Button>
                </CardContent>
                <CardFooter />
              </Card>
              <Card className="col-span-1 lg:col-span-3 h-full w-[640px] max-sm:w-[316px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-xl">
                    05.06.2024
                  </CardTitle>
                  <CardDescription className="text-center">
                    Елизавета, Андрей, Арсений
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="grid items-center">
                    <div>
                      <Label htmlFor="numPeoples">Количество участников:</Label>
                      <Label htmlFor="numPeoples"> 3 </Label>
                    </div>
                    <div>
                      <Label htmlFor="daysInTrip">Продолжительность:</Label>
                      <Label htmlFor="daysInTrip"> 7 </Label>
                      <Label htmlFor="daysInTrip"> дней </Label>
                    </div>
                    <div>
                      <Label htmlFor="typeOfTrip">Вид похода:</Label>
                      <Label htmlFor="typeOfTrip"> Пеший </Label>
                    </div>
                  </div>
                  <Button variant="default" className="mt-4 w-full">
                    Смотреть отчёт
                  </Button>
                </CardContent>
                <CardFooter />
              </Card>
              <Card className="col-span-1 lg:col-span-3 h-full w-[640px] max-sm:w-[316px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-xl">
                    05.06.2024
                  </CardTitle>
                  <CardDescription className="text-center">
                    Елизавета, Андрей, Арсений
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="grid items-center">
                    <div>
                      <Label htmlFor="numPeoples">Количество участников:</Label>
                      <Label htmlFor="numPeoples"> 3 </Label>
                    </div>
                    <div>
                      <Label htmlFor="daysInTrip">Продолжительность:</Label>
                      <Label htmlFor="daysInTrip"> 7 </Label>
                      <Label htmlFor="daysInTrip"> дней </Label>
                    </div>
                    <div>
                      <Label htmlFor="typeOfTrip">Вид похода:</Label>
                      <Label htmlFor="typeOfTrip"> Пеший </Label>
                    </div>
                  </div>
                  <Button variant="default" className="mt-4 w-full">
                    Смотреть отчёт
                  </Button>
                </CardContent>
                <CardFooter />
              </Card>
              <Card className="col-span-1 lg:col-span-3 h-full w-[640px] max-sm:w-[316px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-center text-xl">
                    05.06.2024
                  </CardTitle>
                  <CardDescription className="text-center">
                    Елизавета, Андрей, Арсений
                  </CardDescription>
                </CardHeader>
                <CardContent className="pb-1">
                  <div className="grid items-center">
                    <div>
                      <Label htmlFor="numPeoples">Количество участников:</Label>
                      <Label htmlFor="numPeoples"> 3 </Label>
                    </div>
                    <div>
                      <Label htmlFor="daysInTrip">Продолжительность:</Label>
                      <Label htmlFor="daysInTrip"> 7 </Label>
                      <Label htmlFor="daysInTrip"> дней </Label>
                    </div>
                    <div>
                      <Label htmlFor="typeOfTrip">Вид похода:</Label>
                      <Label htmlFor="typeOfTrip"> Пеший </Label>
                    </div>
                  </div>
                  <Button variant="default" className="mt-4 w-full">
                    Смотреть отчёт
                  </Button>
                </CardContent>
                <CardFooter />
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </LayoutBody>
    </Layout>
  )
}
