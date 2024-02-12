import { SignJWT, jwtVerify } from 'jose'
import { getEnvVariable } from './helpers'

export const signJWT = async (
  payload: { sub: string },
  options: { exp: string }
) => {
  try {
    const secret = new TextEncoder().encode(getEnvVariable('JWT_SECRET_KEY'))
    const alg = 'HS256'
    const token = new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .setSubject(payload.sub)
      .sign(secret)

    return token
  } catch (error) {
    throw error
  }
}

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    const decode = (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload as T
    return decode
  } catch (error) {
    throw new Error('Your token has expired.')
  }
}
