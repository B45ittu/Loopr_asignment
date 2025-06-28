import { Request, Response, NextFunction } from 'express';

export interface PasswordStrengthResult {
  isValid: boolean;
  score: number; // 0-5 (very weak to very strong)
  feedback: string[];
  requirements: {
    length: boolean;
    uppercase: boolean;
    lowercase: boolean;
    numbers: boolean;
    specialChars: boolean;
  };
}

export const validatePasswordStrength = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { password } = req.body;

  if (!password) {
    res.status(400).json({
      message: 'Password is required',
      error: 'PASSWORD_REQUIRED'
    });
    return;
  }

  const result = checkPasswordStrength(password);

  if (!result.isValid) {
    res.status(400).json({
      message: 'Password does not meet strength requirements',
      error: 'PASSWORD_TOO_WEAK',
      details: {
        score: result.score,
        feedback: result.feedback,
        requirements: result.requirements
      }
    });
    return;
  }

  // Add password strength info to request for logging or other purposes
  (req as any).passwordStrength = result;
  next();
};

export const checkPasswordStrength = (password: string): PasswordStrengthResult => {
  const feedback: string[] = [];
  let score = 0;

  // Check minimum length (8 characters)
  const hasMinLength = password.length >= 8;
  if (!hasMinLength) {
    feedback.push('Password must be at least 8 characters long');
  } else {
    score += 1;
  }

  // Check for uppercase letters
  const hasUppercase = /[A-Z]/.test(password);
  if (!hasUppercase) {
    feedback.push('Password must contain at least one uppercase letter');
  } else {
    score += 1;
  }

  // Check for lowercase letters
  const hasLowercase = /[a-z]/.test(password);
  if (!hasLowercase) {
    feedback.push('Password must contain at least one lowercase letter');
  } else {
    score += 1;
  }

  // Check for numbers
  const hasNumbers = /\d/.test(password);
  if (!hasNumbers) {
    feedback.push('Password must contain at least one number');
  } else {
    score += 1;
  }

  // Check for special characters
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  if (!hasSpecialChars) {
    feedback.push('Password must contain at least one special character (!@#$%^&*()_+-=[]{}|;:,.<>?)');
  } else {
    score += 1;
  }

  // Additional strength checks
  if (password.length >= 12) {
    score += 1;
  }

  // Check for common patterns (optional - can be made stricter)
  const commonPatterns = ['password', '123456', 'qwerty', 'admin'];
  const hasCommonPattern = commonPatterns.some(pattern => 
    password.toLowerCase().includes(pattern)
  );
  
  if (hasCommonPattern) {
    feedback.push('Password contains common patterns that should be avoided');
    score = Math.max(0, score - 1);
  }

  const requirements = {
    length: hasMinLength,
    uppercase: hasUppercase,
    lowercase: hasLowercase,
    numbers: hasNumbers,
    specialChars: hasSpecialChars
  };

  // Password is valid if it meets all basic requirements
  const isValid = hasMinLength && hasUppercase && hasLowercase && hasNumbers && hasSpecialChars;

  return {
    isValid,
    score: Math.min(5, score), // Cap at 5
    feedback,
    requirements
  };
}; 