export interface carDetailsTypes {
  _id?: string;
  name: string;
  brand: string;
  model: string;
  category: string;
  year: string;
  image: string | URL;
  transmission: string;
  fuelType: string;
  seatingCapacity: number | "";
  mileage: number | "";
  pricePerDay: number | "";
  availability: boolean;
}
