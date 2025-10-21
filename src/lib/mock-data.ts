
import type { User, Donation, AppNotification, Ngo, UserRole } from "@/lib/types";
import { Bell, CheckCircle, Package, Utensils, HeartHandshake } from "lucide-react";

export const mockUsers: User[] = [
  {
    id: "user-donor-1",
    name: "Renuka's Kitchen",
    email: "contact@renukaskitchen.com",
    avatarUrl: "https://picsum.photos/seed/donor1/100/100",
    role: "donor",
    organizationName: "Renuka's Kitchen",
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
    name: "J Restaurant",
    email: "manager@jrestaurant.com",
    avatarUrl: "https://picsum.photos/seed/donor2/100/100",
    role: "donor",
    organizationName: "J Restaurant",
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
    name: "Empire Restaurant",
    email: "info@empirerestaurant.com",
    avatarUrl: "https://picsum.photos/seed/donor3/100/100",
    role: "donor",
    organizationName: "Empire Restaurant",
    isVerified: true,
  },
];

export const mockDonations: Donation[] = [
  {
    id: "donation-1",
    title: "50 Plates of Chicken Biryani",
    description: "Freshly prepared, flavorful chicken biryani from today's lunch service. Packed in individual containers, ready for immediate distribution.",
    imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "chicken biryani",
    quantity: "50 plates",
    type: "Prepared Meal",
    pickupDeadline: new Date(new Date().getTime() + 6 * 60 * 60 * 1000), // 6 hours from now
    donorId: "user-donor-2",
    donor: mockUsers.find(u => u.id === 'user-donor-2')!,
    status: "available",
    createdAt: new Date(new Date().getTime() - 15 * 60 * 1000), // 15 minutes ago
    distance: 2.5,
  },
  {
    id: "donation-2",
    title: "100 Fresh Chapatis",
    description: "Soft, whole wheat chapatis ready to be paired with any curry or vegetable dish. Made fresh this evening.",
    imageUrl: "https://plus.unsplash.com/premium_photo-1695299440026-b8237b60aa68?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "chapati bread",
    quantity: "Approx. 100 pieces",
    type: "Baked Goods",
    pickupDeadline: new Date(new Date().getTime() + 4 * 60 * 60 * 1000), // 4 hours from now
    donorId: "user-donor-3",
    donor: mockUsers.find(u => u.id === 'user-donor-3')!,
    status: "available",
    createdAt: new Date(new Date().getTime() - 45 * 60 * 1000), // 45 minutes ago
    distance: 4.8,
  },
  {
    id: "donation-3",
    title: "Leftover Wedding Feast (Veg)",
    description: "Generous amount of vegetable pulao, paneer curry, and dal from a wedding event. Can serve at least 70-80 people.",
    imageUrl: "https://images.unsplash.com/photo-1549488344-cbb6c34cf08b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "indian food",
    quantity: "Bulk containers",
    type: "Prepared Meal",
    pickupDeadline: new Date(new Date().getTime() + 3 * 60 * 60 * 1000), // 3 hours from now
    donorId: "user-donor-1",
    donor: mockUsers.find(u => u.id === 'user-donor-1')!,
    status: "claimed",
    claimedByNgoId: "user-ngo-1",
    createdAt: new Date(new Date().getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    distance: 1.2,
  },
  {
    id: "donation-4",
    title: "Day-Old Croissants & Muffins",
    description: "Assorted pastries from yesterday. Still delicious and perfectly fine for consumption. Great for breakfast programs.",
    imageUrl: "https://images.unsplash.com/photo-1599785209707-a456fc1337bb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "assorted pastries",
    quantity: "3 large boxes",
    type: "Baked Goods",
    pickupDeadline: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000), // Expired 1 day ago
    donorId: "user-donor-2",
    donor: mockUsers.find(u => u.id === 'user-donor-2')!,
    status: "expired",
    createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    distance: 2.9,
  },
   {
    id: "donation-5",
    title: "Fresh Mixed Vegetables",
    description: "Crates of fresh, high-quality vegetables including tomatoes, cucumbers, and bell peppers. Surplus from our weekly market stock.",
    imageUrl: "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    imageHint: "fresh vegetables",
    quantity: "5 crates",
    type: "Produce",
    pickupDeadline: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    donorId: "user-donor-3",
    donor: mockUsers.find(u => u.id === 'user-donor-3')!,
    status: "picked-up",
    claimedByNgoId: "user-ngo-2",
    createdAt: new Date(new Date().getTime() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    distance: 6.5,
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
        email: "contact@downtownsoup.org",
        phone: "+1-202-555-0182",
        address: "123 Charity Lane, Springfield, USA",
        distance: "1.5 miles",
        reasonForMatch: "Specializes in distributing baked goods and is only 1.5 miles away from the donor.",
    },
    {
        id: "ngo-match-2",
        name: "The Food Pantry Initiative",
        email: "info@foodpantryinit.com",
        phone: "+1-202-555-0145",
        address: "456 Giving Ave, Springfield, USA",
        distance: "3.2 miles",
        reasonForMatch: "High demand for fresh produce and has refrigerated transport available for pickup.",
    },
    {
        id: "ngo-match-3",
        name: "Westside Homeless Shelter",
        email: "pickup@whshelter.org",
        phone: "+1-202-555-0199",
        address: "789 Hope St, Springfield, USA",
        distance: "5.0 miles",
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
