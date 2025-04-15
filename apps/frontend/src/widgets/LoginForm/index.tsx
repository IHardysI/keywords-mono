"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { login } from "@/shared/api/login"
import { useRouter } from "next/navigation"
import { getUser } from "@/shared/api/utils/getUser"

interface LoginFormProps {
    secretRaw:string
}
export default function LoginForm({secretRaw}:LoginFormProps) {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const handleLogin = async () => {
    const token = await login(email, password)
    if (token) {
      const user=await getUser(token,secretRaw)
      console.log(user)
      if(user){
        localStorage.setItem("user", JSON.stringify(user))
        
      }
    }
  }

  const handleRegister = async () => {
    
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">{isLogin ? "Вход" : "Регистрация"}</CardTitle>
            <div className="flex items-center space-x-2">
              <Label htmlFor="auth-mode" className="text-sm">
                {isLogin ? "Регистрация" : "Вход"}
              </Label>
              <Switch id="auth-mode" checked={!isLogin} onCheckedChange={() => setIsLogin(!isLogin)} />
            </div>
          </div>
          <CardDescription>
            {isLogin ? "Введите ваши данные для входа в аккаунт" : "Создайте новый аккаунт"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" placeholder="Иван Иванов" />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="example@mail.ru" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>
              <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={isLogin ? handleLogin : handleRegister} className="w-full">{isLogin ? "Войти" : "Зарегистрироваться"}</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
