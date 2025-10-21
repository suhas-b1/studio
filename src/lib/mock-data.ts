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
    title: "Fresh Sourdough Bread",
    description: "A batch of freshly baked sourdough bread from this morning. About 20 loaves available.",
    imageUrl: "https://picsum.photos/seed/bread/600/400",
    imageHint: "bread bakery",
    quantity: "20 loaves",
    type: "Baked Goods",
    pickupDeadline: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
    donorId: "user-donor-1",
    donor: mockUsers.find(u => u.id === 'user-donor-1')!,
    status: "available",
    createdAt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
    distance: 2.5,
  },
  {
    id: "donation-2",
    title: "Mixed Organic Vegetables",
    description: "Surplus of organic carrots, bell peppers, and zucchini from today's market.",
    imageUrl: "https://picsum.photos/seed/vegetables/600/400",
    imageHint: "vegetables market",
    quantity: "3 large boxes",
    type: "Produce",
    pickupDeadline: new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000), // 1 day from now
    donorId: "user-donor-2",
    donor: mockUsers.find(u => u.id === 'user-donor-2')!,
    status: "available",
    createdAt: new Date(new Date().getTime() - 3 * 60 * 60 * 1000), // 3 hours ago
    distance: 5.1,
  },
  {
    id: "donation-3",
    title: "Assorted Pastries and Croissants",
    description: "Leftover pastries from our morning service. Includes croissants, muffins, and danishes.",
    imageUrl: "https://picsum.photos/seed/pastries/600/400",
    imageHint: "pastries cafe",
    quantity: "2 boxes",
    type: "Baked Goods",
    pickupDeadline: new Date(new Date().getTime() + 8 * 60 * 60 * 1000), // 8 hours from now
    donorId: "user-donor-1",
    donor: mockUsers.find(u => u.id === 'user-donor-1')!,
    status: "claimed",
    claimedByNgoId: "user-ngo-1",
    createdAt: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    distance: 2.5,
  },
  {
    id: "donation-4",
    title: "Canned Soups and Beans",
    description: "A variety of canned goods, including tomato soup, black beans, and chickpeas. All well within date.",
    imageUrl: "https://picsum.photos/seed/canned/600/400",
    imageHint: "canned goods",
    quantity: "50+ cans",
    type: "Canned Goods",
    pickupDeadline: new Date(new Date().getTime() + 30 * 24 * 60 * 60 * 1000), // 1 month from now
    donorId: "user-donor-2",
    donor: mockUsers.find(u => u.id === 'user-donor-2')!,
    status: "picked-up",
    claimedByNgoId: "user-ngo-2",
    createdAt: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    distance: 8.2,
  },
    {
    id: "donation-5",
    title: "Fresh Milk and Yogurt",
    description: "Nearing expiration but still perfectly good dairy products. 10 gallons of milk and 30 yogurt cups.",
    imageUrl: "https://picsum.photos/seed/dairy/600/400",
    imageHint: "milk dairy",
    quantity: "10 gallons milk, 30 yogurt cups",
    type: "Dairy",
    pickupDeadline: new Date(new Date().getTime() + 12 * 60 * 60 * 1000), // 12 hours from now
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
    description: "Maria's Bakery has listed 'Fresh Sourdough Bread'.",
    read: false,
    createdAt: new Date(new Date().getTime() - 5 * 60 * 1000), // 5 minutes ago
  },
  {
    id: "notif-2",
    icon: CheckCircle,
    title: "Donation Claimed!",
    description: "Your 'Assorted Pastries' donation was claimed by Community Kitchen.",
    read: false,
    createdAt: new Date(new Date().getTime() - 1 * 60 * 60 * 1000), // 1 hour ago
  },
  {
    id: "notif-3",
    icon: Package,
    title: "Donation Picked Up",
    description: "Shelter of Hope has picked up your 'Canned Soups' donation.",
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
