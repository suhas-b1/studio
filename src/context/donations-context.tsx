
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import type { Donation } from '@/lib/types';
import { mockDonations } from '@/lib/mock-data';

interface DonationsContextType {
  donations: Donation[];
  addDonation: (donation: Donation) => void;
  claimDonation: (donationId: string, ngoId: string) => void;
}

const DonationsContext = createContext<DonationsContextType | undefined>(undefined);

export const DonationsProvider = ({ children }: { children: ReactNode }) => {
  const [donations, setDonations] = useState<Donation[]>(mockDonations);

  const addDonation = (donation: Donation) => {
    setDonations((prevDonations) => [donation, ...prevDonations]);
  };

  const claimDonation = (donationId: string, ngoId: string) => {
    setDonations((prevDonations) =>
      prevDonations.map((d) =>
        d.id === donationId ? { ...d, status: 'claimed', claimedByNgoId: ngoId } : d
      )
    );
  };

  return (
    <DonationsContext.Provider value={{ donations, addDonation, claimDonation }}>
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
