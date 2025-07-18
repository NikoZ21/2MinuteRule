import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the context type
interface TestContextType {
  name: string;
  age: number;
  isStudent: boolean;
  updateName: (newName: string) => void;
  updateAge: (newAge: number) => void;
  toggleStudent: () => void;
}

// Create context with undefined initial value
export const TestContext = createContext<TestContextType | undefined>(
  undefined
);

// Custom hook to use the context
export const useTest = () => {
  const context = useContext(TestContext);
  if (!context) {
    throw new Error("useTest must be used within a TestProvider");
  }
  return context;
};

// Provider component props
interface TestProviderProps {
  children: ReactNode;
}

// TestProvider component
export const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  const [name, setName] = useState("test");
  const [age, setAge] = useState(20);
  const [isStudent, setIsStudent] = useState(true);

  const updateName = (newName: string) => {
    setName(newName);
  };

  const updateAge = (newAge: number) => {
    setAge(newAge);
  };

  const toggleStudent = () => {
    setIsStudent((prev) => !prev);
  };

  const value: TestContextType = {
    name,
    age,
    isStudent,
    updateName,
    updateAge,
    toggleStudent,
  };

  return React.createElement(TestContext.Provider, { value }, children);
};
