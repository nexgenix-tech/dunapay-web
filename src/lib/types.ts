// Core entities
export interface TrafficFine {
  id: string
  noticeNumber: string
  vehicleRegistration: string
  driverIdNumber: string
  municipality: Municipality
  offense: Offense
  amount: number
  dueDate: Date
  issueDate: Date
  location: string
  status: "OUTSTANDING" | "PAID" | "OVERDUE" | "DISPUTED"
  discountAmount?: number
  discountValidUntil?: Date
}

export interface Municipality {
  id: string
  name: string
  province: string
  isSupported: boolean
  logoUrl?: string
  contactInfo: ContactInfo
}

export interface ContactInfo {
  phone: string
  email: string
  address: string
}

export interface Offense {
  code: string
  description: string
  category: "SPEEDING" | "PARKING" | "TRAFFIC_LIGHT" | "OTHER"
  points: number
}

export interface PaymentRecord {
  id: string
  fineId: string
  amount: number
  paymentDate: Date
  paymentMethod: string
  transactionId: string
  status: "COMPLETED" | "PENDING" | "FAILED"
}

export interface User {
  id: string
  idNumber: string
  firstName: string
  lastName: string
  email: string
  phone: string
  vehicles: Vehicle[]
  paymentHistory: PaymentRecord[]
}

export interface Vehicle {
  id: string
  registration: string
  make: string
  model: string
  year: number
  userId: string
}

export interface SearchParams {
  idNumber?: string
  noticeNumber?: string
  vehicleRegistration?: string
}

export interface PaymentSession {
  id: string
  fineId: string
  amount: number
  paymentUrl: string
  expiresAt: Date
}

export interface RegisterUserRequest {
  firstName: string
  lastName: string
  email: string
  phone: string
  idNumber: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  user: User
  token: string
}