import { eden } from "@/features/eden/eden"

export const login = async (email: string, password: string) => {
    const token= await eden.login.post({
        email,
        password
    })
    
    return token.data?.token
}