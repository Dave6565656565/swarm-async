// Store important constants here
export const WALLETCONNECT_PROJECT_ID = "2fc330b1a9aa1b7c859bd84210853433"

// You can add a password protection mechanism here if needed
export const isValidPassword = (password: string) => {
  // The password contains the WalletConnect project ID
  return password === WALLETCONNECT_PROJECT_ID
}
