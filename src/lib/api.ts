import type { SearchParams, TrafficFine, PaymentSession, PaymentRecord, AuthResponse, LoginRequest, RegisterUserRequest, User, Vehicle } from "./types"
import { trafficFines, users } from "./dummy-data"

// Placeholder API functions
export async function searchFines(params: SearchParams): Promise<TrafficFine[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const activeParams = Object.keys(params).filter(
    (key) => params[key as keyof SearchParams]
  )

  if (activeParams.length === 1) {
    // Fine-grained search (AND logic for the single active parameter)
    const paramName = activeParams[0] as keyof SearchParams
    const paramValue = params[paramName]

    return trafficFines.filter((fine) => {
      if (paramName === "idNumber") return fine.driverIdNumber === paramValue
      if (paramName === "noticeNumber") return fine.noticeNumber === paramValue
      if (paramName === "vehicleRegistration") return fine.vehicleRegistration === paramValue
      return false
    })
  } else if (activeParams.length > 1) {
    // Broader search (OR logic for multiple active parameters)
    return trafficFines.filter((fine) => {
      let match = false
      if (params.idNumber) {
        match = match || fine.driverIdNumber === params.idNumber
      }
      if (params.noticeNumber) {
        match = match || fine.noticeNumber === params.noticeNumber
      }
      if (params.vehicleRegistration) {
        match = match || fine.vehicleRegistration === params.vehicleRegistration
      }
      return match
    })
  } else {
    // No search parameters provided, return all fines or an empty array
    return [] // Or return trafficFines if you want to show all when no search is active
  }
}

export async function getFineById(id: string): Promise<TrafficFine | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return trafficFines.find((fine) => fine.id === id) || null
}

export async function initiateFinePayment(fineId: string): Promise<PaymentSession> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const fine = trafficFines.find((f) => f.id === fineId)
  if (!fine) throw new Error("Fine not found")

  return {
    id: `session_${Date.now()}`,
    fineId,
    amount: fine.amount,
    paymentUrl: `/payment/${fineId}`,
    expiresAt: new Date(Date.now() + 15 * 60 * 1000), // 15 minutes
  }
}

export async function getUserPaymentHistory(userId: string): Promise<PaymentRecord[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const user = users.find((u) => u.id === userId)
  return user?.paymentHistory || []
}

export async function registerUser(userData: RegisterUserRequest): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  // Check if user already exists
  const existingUser = users.find(
    (u) => u.email === userData.email || u.idNumber === userData.idNumber
  )
  
  if (existingUser) {
    if (existingUser.email === userData.email) {
      throw new Error("An account with this email already exists")
    }
    if (existingUser.idNumber === userData.idNumber) {
      throw new Error("An account with this ID number already exists")
    }
  }

  // Create new user
  const newUser: User = {
    id: `user_${Date.now()}`,
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    idNumber: userData.idNumber,
    vehicles: [],
    paymentHistory: [],
  }

  // Add to users array (in real implementation, this would save to database)
  users.push(newUser)

  // Return auth response
  return {
    user: newUser,
    token: `token_${Date.now()}`,
  }
}

// Login user
export async function loginUser(credentials: LoginRequest): Promise<AuthResponse> {
  await new Promise((resolve) => setTimeout(resolve, 1000))

  const user = users.find((u) => u.email === credentials.email)
  
  if (!user) {
    throw new Error("Invalid email or password")
  }

  // In real implementation, you would verify the password hash
  // For now, we'll simulate a successful login
  return {
    user,
    token: `token_${Date.now()}`,
  }
}

// Get user by ID
export async function getUserById(userId: string): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return users.find((u) => u.id === userId) || null
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return users.find((u) => u.email === email) || null
}

// Get user by ID number
export async function getUserByIdNumber(idNumber: string): Promise<User | null> {
  await new Promise((resolve) => setTimeout(resolve, 500))
  return users.find((u) => u.idNumber === idNumber) || null
}

// Update user profile
export async function updateUserProfile(
  userId: string,
  updates: Partial<Omit<User, "id" | "vehicles" | "paymentHistory">>
): Promise<User> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const userIndex = users.findIndex((u) => u.id === userId)
  if (userIndex === -1) {
    throw new Error("User not found")
  }

  // Update user data
  users[userIndex] = { ...users[userIndex], ...updates }
  
  return users[userIndex]
}

// Add vehicle to user account
export async function addVehicleToUser(userId: string, vehicle: Omit<Vehicle, "id" | "userId">): Promise<Vehicle> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  const user = users.find((u) => u.id === userId)
  if (!user) {
    throw new Error("User not found")
  }

  // Check if vehicle already exists
  const existingVehicle = user.vehicles.find((v) => v.registration === vehicle.registration)
  if (existingVehicle) {
    throw new Error("Vehicle already registered to this account")
  }

  const newVehicle: Vehicle = {
    id: `vehicle_${Date.now()}`,
    userId,
    ...vehicle,
  }

  user.vehicles.push(newVehicle)
  
  return newVehicle
}

// Remove vehicle from user account
export async function removeVehicleFromUser(userId: string, vehicleId: string): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  const user = users.find((u) => u.id === userId)
  if (!user) {
    throw new Error("User not found")
  }

  const vehicleIndex = user.vehicles.findIndex((v) => v.id === vehicleId)
  if (vehicleIndex === -1) {
    throw new Error("Vehicle not found")
  }

  user.vehicles.splice(vehicleIndex, 1)
}

// Get fines for a specific user (by ID number)
export async function getUserFines(userId: string): Promise<TrafficFine[]> {
  await new Promise((resolve) => setTimeout(resolve, 800))

  const user = users.find((u) => u.id === userId)
  if (!user) {
    throw new Error("User not found")
  }

  // Find all fines for this user's ID number and vehicles
  const userVehicleRegistrations = user.vehicles.map((v) => v.registration)
  
  return trafficFines.filter((fine) => 
    fine.driverIdNumber === user.idNumber || 
    userVehicleRegistrations.includes(fine.vehicleRegistration)
  )
}