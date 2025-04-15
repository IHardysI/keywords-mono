import LoginForm from "@/widgets/LoginForm"

export default function LoginPage() {
  const secretRaw=process.env.JWT_SECRET
  if(!secretRaw){
    throw new Error("JWT_SECRET is not defined")
  }
  return <LoginForm secretRaw={secretRaw} />
}