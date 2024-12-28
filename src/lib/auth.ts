import { supabase } from './supabase';
import toast from 'react-hot-toast';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15; // minutes

export async function checkAccountLockout(email: string) {
  // First try to get the profile
  const { data: existingProfile } = await supabase
    .from('user_profiles')
    .select('failed_attempts, locked_until')
    .eq('username', email)
    .single();

  // If profile doesn't exist, create it
  if (!existingProfile) {
    const { error: insertError } = await supabase
      .from('user_profiles')
      .insert([
        { 
          username: email,
          failed_attempts: 0,
          locked_until: null
        }
      ]);
    
    if (insertError) {
      console.error('Error creating user profile:', insertError);
      return false;
    }
    
    return false; // New profile, not locked
  }

  // Check if account is locked
  if (existingProfile.locked_until && new Date(existingProfile.locked_until) > new Date()) {
    const timeLeft = Math.ceil(
      (new Date(existingProfile.locked_until).getTime() - new Date().getTime()) / 1000 / 60
    );
    toast.error(`Account is locked. Try again in ${timeLeft} minutes.`);
    return true;
  }

  return false;
}

export async function updateLoginAttempts(email: string, success: boolean) {
  if (success) {
    // Reset failed attempts on successful login
    await supabase
      .from('user_profiles')
      .update({ 
        failed_attempts: 0,
        locked_until: null 
      })
      .eq('username', email);
    return;
  }

  // Get current profile or create it
  const { data: profile } = await supabase
    .from('user_profiles')
    .select('failed_attempts')
    .eq('username', email)
    .single();

  const newAttempts = ((profile?.failed_attempts || 0) + 1);
  
  if (newAttempts >= MAX_LOGIN_ATTEMPTS) {
    const lockedUntil = new Date();
    lockedUntil.setMinutes(lockedUntil.getMinutes() + LOCKOUT_DURATION);
    
    await supabase
      .from('user_profiles')
      .upsert({ 
        username: email,
        failed_attempts: newAttempts,
        locked_until: lockedUntil.toISOString()
      });
      
    toast.error(`Too many failed attempts. Account locked for ${LOCKOUT_DURATION} minutes.`);
  } else {
    await supabase
      .from('user_profiles')
      .upsert({ 
        username: email,
        failed_attempts: newAttempts
      });
  }
}