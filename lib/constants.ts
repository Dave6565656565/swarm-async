export const WALLET_CONNECT_PROJECT_ID = "2fc330b1a9aa1b7c859bd84210853433"

// Simple password validation function that uses the project ID
export const validatePassword = (password: string): boolean => {
  return password === WALLET_CONNECT_PROJECT_ID
}
