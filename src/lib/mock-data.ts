import type { User, Donation, AppNotification, Ngo, UserRole } from "@/lib/types";
import { Bell, CheckCircle, Package, Utensils, HeartHandshake } from "lucide-react";

const mockUsers: User[] = [
  {
    id: "user-donor-1",
    name: "Maria's Bakery",
    email: "maria@bakery.com",
    avatarUrl: "https://picsum.photos/seed/donor1/100/100",
    role: "donor",
    organizationName: "Maria's Bakery",
    isVerified: true,
  },
  {
    id: "user-ngo-1",
    name: "Community Kitchen",
    email: "contact@communitykitchen.org",
    avatarUrl: "https://picsum.photos/seed/ngo1/100/100",
    role: "ngo",
    organizationName: "Community Kitchen",
    isVerified: true,
  },
    {
    id: "user-donor-2",
    name: "Grocer's Market",
    email: "manager@grocermarket.com",
    avatarUrl: "https://picsum.photos/seed/donor2/100/100",
    role: "donor",
    organizationName: "Grocer's Market",
    isVerified: true,
  },
  {
    id: "user-ngo-2",
    name: "Shelter of Hope",
    email: "intake@shelterofhope.net",
    avatarUrl: "https://picsum.photos/seed/ngo2/100/100",
    role: "ngo",
    organizationName: "Shelter of Hope",
    isVerified: false,
  },
];

export const mockDonations: Donation[] = [
  {
    id: "donation-1",
    title: "Cases of Canned Tuna",
    description: "2 cases of chunk light tuna in water. Best by date is over a year away. High in protein.",
    imageUrl: "https://picsum.photos/seed/tuna/600/400",
    imageHint: "canned tuna",
    quantity: "2 cases (48 cans)",
    type: "Canned Goods",
    pickupDeadline: new Date(new Date().getTime() + 10 * 24 * 60 * 60 * 1000), // 10 days from now
    donorId: "user-donor-2",
    donor: mockUsers.find(u => u.id === 'user-donor-2')!,
    status: "available",
    createdAt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
    distance: 5.1,
  },
  {
    id: "donation-2",
    title: "Bulk Dry Pasta (Spaghetti)",
    description: "10kg of spaghetti in sealed packaging. Great for large meal preparations.",
    imageUrl: "https://picsum.photos/seed/pasta/600/400",
    imageHint: "dry pasta",
    quantity: "10 kg",
    type: "Pantry",
    pickupDeadline: new Date(new Date().getTime() + 20 * 24 * 60 * 60 * 1000), // 20 days from now
    donorId: "user-donor-1",
    donor: mockUsers.find(u => u.id === 'user-donor-1')!,
    status: "available",
    createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
    distance: 2.5,
  },
  {
    id: "donation-3",
    title: "Large Bags of White Rice",
    description: "5 large bags of long-grain white rice. Each bag is 5kg. Perfect pantry staple.",
    imageUrl: "https://picsum.photos/seed/rice/600/400",
    imageHint: "bags of rice",
    quantity: "5 bags (25kg total)",
    type: "Pantry",
    pickupDeadline: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000), // 15 days from now
    donorId: "user-donor-2",
    donor: mockUsers.find(u => u.id === 'user-donor-2')!,
    status: "claimed",
    claimedByNgoId: "user-ngo-1",
    createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    distance: 5.1,
  },
  {
    id: "donation-4",
    title: "Canned Tomato Soup (Expired)",
    description: "A variety of canned tomato soup. These are past the 'best by' date but are non-perishable and likely still safe.",
    imageUrl: "https://picsum.photos/seed/canned/600/400",
    imageHint: "canned soup",
    quantity: "30+ cans",
    type: "Canned Goods",
    pickupDeadline: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // Expired 1 week ago
    donorId: "user-donor-1",
    donor: mockUsers.find(u => u.id === 'user-donor-1')!,
    status: "expired",
    claimedByNgoId: "user-ngo-2",
    createdAt: new Date(new Date().getTime() - 30 * 24 * 60 * 60 * 1000), // 1 month ago
    distance: 8.2,
  },
  {
    id: "donation-5",
    title: "UHT Shelf-Stable Milk",
    description: "Cases of Ultra-High Temperature (UHT) milk that do not require refrigeration until opened.",
    imageUrl: "https://picsum.photos/seed/uht-milk/600/400",
    imageHint: "cartons milk",
    quantity: "5 cases (60 cartons)",
    type: "Dairy",
    pickupDeadline: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    donorId: "user-donor-2",
    donor: mockUsers.find(u => u.id === 'user-donor-2')!,
    status: "available",
    createdAt: new Date(new Date().getTime() - 30 * 60 * 1000), // 30 minutes ago
    distance: 4.8,
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: "notif-1",
    icon: Bell,
    title: "New Donation Available",
    description: "Grocer's Market has listed 'Cases of Canned Tuna'.",
    read: false,
    createdAt: new Date(new Date().getTime() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: "notif-2",
    icon: CheckCircle,
    title: "Donation Claimed!",
    description: "Your 'Large Bags of White Rice' donation was claimed by Community Kitchen.",
    read: false,
    createdAt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: "notif-3",
    icon: Package,
    title: "Donation Expired",
    description: "Your 'Canned Tomato Soup' listing has expired.",
    read: true,
    createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
  },
  {
    id: "notif-4",
    icon: HeartHandshake,
    title: "Welcome to Nourish Connect!",
    description: "Thank you for joining our mission to fight food waste.",
    read: true,
    createdAt: new Date(new Date().getTime() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
  },
];

export const mockMatchedNgos: Ngo[] = [
    {
        id: "ngo-match-1",
        name: "Downtown Soup Kitchen",
        contactInformation: "contact@downtownsoup.org",
        reasonForMatch: "Specializes in distributing baked goods and is only 1.5 miles away from the donor.",
    },
    {
        id: "ngo-match-2",
        name: "The Food Pantry Initiative",
        contactInformation: "info@foodpantryinit.com",
        reasonForMatch: "High demand for fresh produce and has refrigerated transport available for pickup.",
    },
    {
        id: "ngo-match-3",
        name: "Westside Homeless Shelter",
        contactInformation: "pickup@whshelter.org",
        reasonForMatch: "Serves daily meals and has an immediate need for prepared or easily preparable food items.",
    },
];

export const getUser = (role: UserRole): User => {
  return mockUsers.find(u => u.role === role)!;
}

export const impactStats = {
    mealsProvided: 1240,
    foodSavedKg: 560,
    co2ReducedTons: 1.4,
    donationsMade: 32,
};
