export interface Complaint {
  id: string
  userId: string
  type: string
  description: string
  image: string[]
  location: string
  email: string
  phone: string
  status: string
  createdAt: Date
  updatedAt: Date
}
