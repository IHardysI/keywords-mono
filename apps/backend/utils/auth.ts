import { SignJWT } from "jose"

const SALT_ROUNDS = 10
const JWT_SECRET = process.env.JWT_SECRET

export async function hashPassword(password: string) {
    return await Bun.password.hash(password,{
        algorithm: "bcrypt",
        cost: SALT_ROUNDS
    })
}

export async function verifyPassword(password: string, hash: string) {
    return await Bun.password.verify(password, hash)
}

export async function generateAuthToken(user: {email: string, role: string, _id: string}) {
    const payload = {
        email: user.email,
        role: user.role,
        _id: user._id.toString()
    }

    const secretKey = new TextEncoder().encode(JWT_SECRET)
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("12h")
        .sign(secretKey)
    
}


