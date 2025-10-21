
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Donation } from '@/lib/types';
import { mockDonations } from '@/lib/mock-data';

interface DonationsContextType {
  donations: Donation[];
  addDonation: (donation: Donation) => void;
}

const DonationsContext = createContext<DonationsContextType | undefined>(undefined);

export const DonationsProvider = ({ children }: { children: ReactNode }) => {
  const [donations, setDonations] = useState<Donation[]>(mockDonations);

  const addDonation = (donation: Donation) => {
    setDonations((prevDonations) => [donation, ...prevDonations]);
  };

  return (
    <DonationsContext.Provider value={{ donations, addDonation }}>
      {children}
    </DonationsContext.Provider>
  );
};

export const useDonations = () => {
  const context = useContext(DonationsContext);
  if (context === undefined) {
    throw new Error('useDonations must be used within a DonationsProvider');
  }
  return context;
};
