import type { TrafficFine, Municipality, Offense, User } from "./types"

export const municipalities: Municipality[] = [
  {
    id: "1",
    name: "City of Tshwane",
    province: "Gauteng",
    isSupported: true,
    logoUrl: "https://www.tshwane.gov.za/wp-content/uploads/2017/05/contttttt-1.png",
    contactInfo: {
      phone: "012 358 1906",
      email: "licensingenquiries@tshwane.gov.za",
      address: "Tshwane House, Pretoria, 0002",
    },
  },
  {
    id: "2",
    name: "City of Johannesburg",
    province: "Gauteng",
    isSupported: true,
    logoUrl: "https://joburg.org.za/SiteAssets/1.png",
    contactInfo: {
      phone: "011 407 7911",
      email: "traffic@joburg.org.za",
      address: "Braamfontein Centre, Johannesburg, 2017",
    },
  },
  
  {
    id: "4",
    name: "Emalahleni Local Municipality",
    province: "Mpumalanga",
    isSupported: true,
    logoUrl: "https://www.emalahleni.gov.za/v2/images/Emalahleni_Local_municipality_website__LOGO.jpg",
    contactInfo: {
      phone: "013 690 6911",
      email: "traffic@emalahleni.gov.za",
      address: "29 Mandela St, eMalahleni, 1034",
    },
  },
  {
    id: "5",
    name: "City of Ekurhuleni",
    province: "Gauteng",
    isSupported: false,
    logoUrl: "https://www.ekurhuleni.gov.za/wp-content/uploads/2022/07/Trademark-logo-horizontal.png",
    contactInfo: {
      phone: "0860 543 000",
      email: "traffic@ekurhuleni.gov.za",
      address: "Trichardt Rd, Boksburg, Johannesburg, 1460",
    },
  },
]

export const offenses: Offense[] = [
  {
    code: "SP001",
    description: "Exceeding speed limit by 10-20 km/h",
    category: "SPEEDING",
    points: 1,
  },
  {
    code: "SP002",
    description: "Exceeding speed limit by 21-30 km/h",
    category: "SPEEDING",
    points: 2,
  },
  {
    code: "PK001",
    description: "Parking in a no-parking zone",
    category: "PARKING",
    points: 0,
  },
  {
    code: "TL001",
    description: "Disobeying traffic light signal",
    category: "TRAFFIC_LIGHT",
    points: 3,
  },
  {
    code: "OT001",
    description: "Driving without a valid license",
    category: "OTHER",
    points: 5,
  },
]

export const trafficFines: TrafficFine[] = [
  {
    id: "1",
    noticeNumber: "CT2024001234",
    vehicleRegistration: "CA123456",
    driverIdNumber: "8001015009087",
    municipality: municipalities[0],
    offense: offenses[0],
    amount: 500,
    dueDate: new Date("2024-02-15"),
    issueDate: new Date("2024-01-15"),
    location: "N1 Highway, Bellville",
    status: "OUTSTANDING",
    discountAmount: 50,
    discountValidUntil: new Date("2024-02-01"),
  },
  {
    id: "2",
    noticeNumber: "JHB2024005678",
    vehicleRegistration: "GP987654",
    driverIdNumber: "7505123456789",
    municipality: municipalities[1],
    offense: offenses[3],
    amount: 1500,
    dueDate: new Date("2024-03-01"),
    issueDate: new Date("2024-02-01"),
    location: "Sandton Drive & Rivonia Road",
    status: "OVERDUE",
  },
  {
    id: "3",
    noticeNumber: "DBN2024009876",
    vehicleRegistration: "NP456789",
    driverIdNumber: "9203087654321",
    municipality: municipalities[2],
    offense: offenses[2],
    amount: 200,
    dueDate: new Date("2024-01-30"),
    issueDate: new Date("2023-12-30"),
    location: "Beachfront Parking Area",
    status: "PAID",
  },
]

export const users: User[] = [
  {
    id: "1",
    idNumber: "8001015009087",
    firstName: "John",
    lastName: "Smith",
    email: "john.smith@email.com",
    phone: "082 123 4567",
    vehicles: [
      {
        id: "1",
        registration: "CA123456",
        make: "Toyota",
        model: "Corolla",
        year: 2020,
        userId: "1",
      },
    ],
    paymentHistory: [
      {
        id: "1",
        fineId: "3",
        amount: 200,
        paymentDate: new Date("2024-01-25"),
        paymentMethod: "Credit Card",
        transactionId: "TXN123456789",
        status: "COMPLETED",
      },
    ],
  },
]
