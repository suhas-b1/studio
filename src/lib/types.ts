import type { LucideIcon } from "lucide-react";

export type UserRole = "donor" | "ngo";

export type User = {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  role: UserRole;
  organizationName?: string;
  isVerified: boolean;
};

export type Donation = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  quantity: string;
  type: "Produce" | "Baked Goods" | "Canned Goods" | "Prepared Meal" | "Dairy" | "Pantry";
  pickupDeadline: Date;
  donorId: string;
  donor: User;
  status: "available" | "claimed" | "picked-up" | "expired";
  claimedByNgoId?: string;
  createdAt: Date;
  distance: number;
};

export type Ngo = {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    distance: string;
    reasonForMatch: string;
};

export type AppNotification = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
  read: boolean;
  createdAt: Date;
};
