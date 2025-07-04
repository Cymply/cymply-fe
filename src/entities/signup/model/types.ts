export interface NicknameValidationResult {
  isValid: boolean
  errorMessage: string
}

export interface NicknameCheckResult {
  isAvailable: boolean
  isDuplicate: boolean
  errorMessage: string
}

export interface NicknameState {
  isValid: boolean
  isDuplicate: boolean
  isChecking: boolean
  errorMessage: string
}

export type NicknameInputStatus = 'default' | 'checking' | 'valid' | 'duplicate' | 'error'