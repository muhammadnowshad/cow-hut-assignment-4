/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
enum Location {
  Dhaka = 'Dhaka',
  Chattogram = 'Chattogram',
  Barishal = 'Barishal',
  Rajshahi = 'Rajshahi',
  Sylhet = 'Sylhet',
  Comilla = 'Comilla',
  Rangpur = 'Rangpur',
  Mymensingh = 'Mymensingh',
}

enum Breed {
  Brahman = 'Brahman',
  Nellore = 'Nellore',
  Sahiwal = 'Sahiwal',
  Gir = 'Gir',
  Indigenous = 'Indigenous',
  Tharparkar = 'Tharparkar',
  Kankrej = 'Kankrej',
}

enum Label {
  ForSale = 'for sale',
  SoldOut = 'sold out',
}

enum Category {
  Dairy = 'Dairy',
  Beef = 'Beef',
  DualPurpose = 'Dual Purpose',
}

// Cow interface
interface ICow {
  id: string
  name: string
  age: number
  price: number
  location: Location
  breed: Breed
  weight: number
  label?: Label
  category: Category
  seller: string
}

export { ICow, Location, Breed, Label, Category }

export type ICowFilters = {
  searchTerm?: string
  location?: Location
  breed?: Breed
  category?: Category
  minPrice?: number
  maxPrice?: number
}
