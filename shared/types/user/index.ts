export interface IsigninResponse {
  status: string
  token: string
}

export interface IsignupResponse {
  status: string
  data: Data
}

export interface Data {
  user: User
}

export interface User {
  uid: string
  username: string
  imageUrl: null
  bio: null
  createdAt: Date
  updatedAt: Date
}
