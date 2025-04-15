import { jwtVerify } from "jose"

export const getUser = async (token: string,secretRaw:string) => {
    const secretKey = new TextEncoder().encode(secretRaw)
    console.log(token,"token",secretRaw,"secretKey")
    try{
        const {payload} = await jwtVerify(token, secretKey)
        return payload
    }catch(error){
        console.error(error)
        return null
    }
}