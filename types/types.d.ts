// GET
type TGETUsers = {
  id: number;
  email: string;
  phoneNumber: string;
  city: string;
  zip: number;
  message: string;
  password: string;
  username: string;
  address: string;
};

// Admin
type TGETAdmin = {
  id: number;
  email: string;
  password: string;
};

// Car
type TGETCars = {
  id: number;
  name: string;
  carType: string;
  rating: number;
  fuel: string;
  image: string;
  hourRate: string;
  dayRate: string;
  monthRate: string;
  orderId: number;
  order: TGETOrderById;
};

type TPOSTCar = {
  name: string;
  carType: string;
  rating: number;
  fuel: string;
  image: string;
  hourRate: string;
  dayRate: string;
  monthRate: string;
  orderId: number;
};

type TPUTCar = {
  name: string;
  carType: string;
  rating: number;
  fuel: string;
  image: string;
  hourRate: string;
  dayRate: string;
  monthRate: string;
  orderId: number;
};

// Order
type TGETOrders = {
  id: number;
  pickUpLoc: string;
  dropOffLoc: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime: string;
  car: TGETCars[];
  user: TGETUsers;
  admin: TGETAdmin;
};

type TGETOrderById = {
  id: number;
  pickUpLoc: string;
  dropOffLoc: string;
  pickUpDate: string;
  dropOffDate: string;
  pickUpTime: string;
  userId: number;
  adminId: number;
};

type TPOSTOrder = {
  pickUpLoc: string;
  dropOffLoc: string;
  pickUpTime: string;
  pickUpDate: string;
  dropOffDate: string;
  userId?: number;
  adminId?: number;
};

type TPUTOrder = {
  pickUpLoc: string;
  dropOffLoc: string;
  pickUpTime: string;
  pickUpDate: string;
  dropOffDate: string;
};

// Others
type TCarRatings = {
  id: number;
  rating: number;
};
