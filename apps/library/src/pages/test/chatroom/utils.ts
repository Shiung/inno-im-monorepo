export interface IUser {
  account: string
  token: string
}

export const getUser = async (): Promise<IUser> => {
  try {
    //@ts-ignore
    const user = await import('$src/assets/user')
    return user
  } catch (e) {

    return { account: '', token: '' }
  }
}
