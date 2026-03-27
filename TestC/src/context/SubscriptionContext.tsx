import React from 'react';

type SubscriptionContextValue = {
  /** true после успешной «покупки» / триала */
  isSubscribed: boolean;
  setSubscribed: (value: boolean) => void;
};

const SubscriptionContext = React.createContext<SubscriptionContextValue | undefined>(undefined);

export function SubscriptionProvider({ children }: { children: React.ReactNode }) {
  const [isSubscribed, setSubscribed] = React.useState(false);

  const value = React.useMemo(
    () => ({ isSubscribed, setSubscribed }),
    [isSubscribed],
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const ctx = React.useContext(SubscriptionContext);
  if (!ctx) {
    throw new Error('useSubscription must be used inside SubscriptionProvider');
  }
  return ctx;
}
