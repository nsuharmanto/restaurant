export function getAvatar(user?: { email?: string; avatar?: string }) {
  if (user?.email?.toLowerCase() === 'nsuharmanto@gmail.com') return '/images/me_ai.png';
  if (user?.avatar && user.avatar.trim() !== '') return user.avatar;
  return '/images/user_avatar.png';
}