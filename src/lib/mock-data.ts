
import type { User, Donation, AppNotification, Ngo, UserRole } from "@/lib/types";
import { Bell, CheckCircle, Package, Utensils, HeartHandshake } from "lucide-react";

const mockUsers: User[] = [
  {
    id: "user-donor-1",
    name: "Royal Gardenia Hall",
    email: "contact@royalgardenia.com",
    avatarUrl: "https://picsum.photos/seed/donor1/100/100",
    role: "donor",
    organizationName: "Royal Gardenia Hall",
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
    name: "Grand Palace Hotel",
    email: "manager@grandpalace.com",
    avatarUrl: "https://picsum.photos/seed/donor2/100/100",
    role: "donor",
    organizationName: "Grand Palace Hotel",
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
  {
    id: "user-donor-3",
    name: "Sagar Restaurant",
    email: "info@sagarrestaurant.com",
    avatarUrl: "https://picsum.photos/seed/donor3/100/100",
    role: "donor",
    organizationName: "Sagar Restaurant",
    isVerified: true,
  },
];

export const mockDonations: Donation[] = [
  {
    id: "donation-2",
    title: "10 Bags of Rice",
    description: "Premium quality white rice, 10 bags of 10kg each. Ideal for daily meals, pulao, or biryani.",
    imageUrl: "https://images.unsplash.com/photo-1723475158229-894679ca024e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxiYWdzJTIwb2YlMjByaWNlfGVufDB8fHx8MTc2MTA0NTgxNnww&ixlib=rb-4.1.0&q=80&w=1080",
    imageHint: "rice bags",
    quantity: "10 bags (100kg total)",
    type: "Pantry",
    pickupDeadline: new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000), // 5 days from now
    donorId: "user-donor-1",
    donor: mockUsers.find(u => u.id === 'user-donor-1')!,
    status: "available",
    createdAt: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    distance: 3.2,
  },
  {
    id: "donation-3",
    title: "50 Plates of Chicken Biryani",
    description: "Freshly prepared chicken biryani from today's event. Packed in individual containers. Ready to eat.",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "chicken biryani",
    quantity: "50 plates",
    type: "Prepared Meal",
    pickupDeadline: new Date(new Date().getTime() + 4 * 60 * 60 * 1000), // 4 hours from now
    donorId: "user-donor-2",
    donor: mockUsers.find(u => u.id === 'user-donor-2')!,
    status: "claimed",
    claimedByNgoId: "user-ngo-1",
    createdAt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
    distance: 5.1,
  },
  {
    id: "donation-4",
    title: "Full Meal for 100 People (Chapati & Pulao)",
    description: "Complete vegetarian meal pack including soft chapatis and vegetable pulao. Leftover from a function.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1695299440026-b8237b60aa68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "chapati pulao",
    quantity: "100 meals",
    type: "Prepared Meal",
    pickupDeadline: new Date(new Date().getTime() + 3 * 60 * 60 * 1000), // 3 hours from now
    donorId: "user-donor-3",
    donor: mockUsers.find(u => u.id === 'user-donor-3')!,
    status: "available",
    createdAt: new Date(new Date().getTime() - 30 * 60 * 1000), // 30 minutes ago
    distance: 8.2,
  },
   {
    id: "donation-5",
    title: "Assorted Pastries (Expired)",
    description: "A variety of pastries from yesterday. Past 'best by' for sale, but still good for consumption.",
    imageUrl: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "assorted pastries",
    quantity: "2 boxes",
    type: "Baked Goods",
    pickupDeadline: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // Expired 1 day ago
    donorId: "user-donor-2",
    donor: mockUsers.find(u => u.id === 'user-donor-2')!,
    status: "expired",
    createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    distance: 5.1,
  },
];

export const mockNotifications: AppNotification[] = [
  {
    id: "notif-1",
    icon: Bell,
    title: "New Donation Available",
    description: "Sagar Restaurant has listed 'Full Meal for 100 People'.",
    read: false,
    createdAt: new Date(new Date().getTime() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: "notif-2",
    icon: CheckCircle,
    title: "Donation Claimed!",
    description: "Your '50 Plates of Chicken Biryani' donation was claimed by Community Kitchen.",
    read: false,
    createdAt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: "notif-3",
    icon: Package,
    title: "Donation Expired",
    description: "Your 'Assorted Pastries' listing has expired.",
    read: true,
    createdAt: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
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
