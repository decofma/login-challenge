import React, { createContext, useContext, useState } from 'react';

interface AccountData {
  username: string;
  email: string;
  password: string;
}

interface AccountContextType {
  accountData: AccountData;
  setAccountData: (data: Partial<AccountData>) => void;
  resetAccount: () => void;
}

const AccountContext = createContext<AccountContextType>({} as AccountContextType);

export const AccountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accountData, setData] = useState<AccountData>({
    username: '',
    email: '',
    password: '',
  });

  const setAccountData = (data: Partial<AccountData>) => {
    setData(prev => ({ ...prev, ...data }));
  };

  const resetAccount = () => {
    setData({ username: '', email: '', password: '' });
  };

  return (
    <AccountContext.Provider value={{ accountData, setAccountData, resetAccount }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccount = () => useContext(AccountContext);