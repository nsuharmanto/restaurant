import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../features/store';
import { getAvatar } from '../utils/getAvatar';
import { logout } from '../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import * as React from 'react';
import axios from '../services/api/axios';
import { X } from 'lucide-react';

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const phone = user?.phone || '-';

  const [name, setName] = React.useState(user?.name || '');
  const [handphone, setHandphone] = React.useState(user?.phone || '');

  const [currentPassword, setCurrentPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  const [passwordErrors, setPasswordErrors] = React.useState<{
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  }>({});

  const [profileErrors, setProfileErrors] = React.useState<{
    name?: string;
    handphone?: string;
  }>({});

  const [showCurrentPassword, setShowCurrentPassword] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const [loadingProfile, setLoadingProfile] = React.useState(false);
  const [loadingPassword, setLoadingPassword] = React.useState(false);

  React.useEffect(() => {
    setName(user?.name || '');
    setHandphone(user?.phone || '');
  }, [user]);

  React.useEffect(() => {
    if (!user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  if (!user) return null;

  const validateProfileField = (field: 'name' | 'handphone', value: string) => {
    let error = '';
    if (field === 'name') {
      if (!value.trim()) error = 'Name is required';
    }
    if (field === 'handphone') {
      if (!value.trim()) error = 'Handphone number is required';
    }
    setProfileErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  const validateProfileAll = () => {
    const errors: { name?: string; handphone?: string } = {};
    if (!name.trim()) errors.name = 'Name is required';
    if (!handphone.trim()) errors.handphone = 'Handphone number is required';
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfileAll()) return;

    setLoadingProfile(true);
    try {
      await axios.put('https://foody-api-xi.vercel.app/api/auth/profile', {
        name,
        phone: handphone,
      });
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
        duration: 3000,
        variant: 'default'
      });
    } catch {
      toast({
        title: 'Update failed',
        description: 'Failed to update your profile. Please try again.',
        duration: 3000,
        variant: 'destructive',
      });
    }
    setLoadingProfile(false);
  };

  const validatePasswordField = (name: string, value: string) => {
    let error = '';
    if (name === 'currentPassword') {
      if (!value) error = 'Current password is required';
    }
    if (name === 'newPassword') {
      if (!value) error = 'New password is required';
      else if (value.length < 6) error = 'Min 6 characters';
    }
    if (name === 'confirmPassword') {
      if (!value) error = 'Confirm password is required';
      else if (value !== newPassword) error = 'Passwords do not match';
    }
    setPasswordErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: typeof passwordErrors = {};

    if (!currentPassword) errors.currentPassword = 'Current password is required';
    if (!newPassword) errors.newPassword = 'New password is required';
    else if (newPassword.length < 6) errors.newPassword = 'Min 6 characters';
    if (!confirmPassword) errors.confirmPassword = 'Confirm password is required';
    else if (newPassword !== confirmPassword) errors.confirmPassword = 'Passwords do not match';

    setPasswordErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoadingPassword(true);
    try {
      await axios.put('https://foody-api-xi.vercel.app/api/auth/profile', {
        currentPassword,
        newPassword,
      });
      toast({
        title: 'Password changed',
        description: 'Your password has been changed successfully.',
        duration: 3000,
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPasswordErrors({});
    } catch {
      toast({
        title: 'Change failed',
        description: 'Failed to change your password. Please try again.',
        duration: 3000,
      });
    }
    setLoadingPassword(false);
  };

  const EyeOpen = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path
        d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12zm11 3a3 3 0 100-6 3 3 0 000 6z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
  const EyeClosed = (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path
        d="M17.94 17.94A10.94 10.94 0 0112 19C7 19 2.73 15.89 1 12a17.77 17.77 0 013.07-4.61M9.9 9.9a3 3 0 104.24 4.24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="21"
        y1="21"
        x2="3"
        y2="3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fafafa]">
      <Header solid />
      <main
        className="flex-1 w-full flex flex-col md:flex-row
        md:items-start
        md:justify-start
        px-4
        md:px-[clamp(1rem,8vw,120px)]
        py-[clamp(1.5rem,4vw,3rem)]
        md:py-[clamp(2.5rem,6vw,4rem)]
        bg-[#fafafa]
        transition-all"
      >
        <div className="w-full flex flex-col md:flex-row gap-8 mt-[48px] mb-[197px]">
          <aside
            className="hidden md:flex flex-col bg-white rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] p-6 min-w-[240px] max-w-[260px] h-max mr-0 md:mr-8"
            style={{ marginRight: 32 }}
          >
            <div className="flex flex-row items-center mb-6 gap-3 w-max">
              <img
                src={getAvatar(user || undefined)}
                alt={user?.name || 'User'}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div className="font-bold text-lg text-gray-900 whitespace-nowrap">{user?.name}</div>
            </div>
            <button
              className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-gray-50 font-medium text-left text-gray-900 transition"
              onClick={() => navigate('/address')}
            >
              <img
                src="/icons/delivery_address.svg"
                alt="Delivery Address"
                width={24}
                height={24}
                className="inline-block"
              />
              <span className="text-base">Delivery Address</span>
            </button>
            <button
              className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-gray-50 font-medium text-left text-gray-900 transition"
              onClick={() => navigate('/orders')}
            >
              <img
                src="/icons/my_orders.svg"
                alt="My Orders"
                width={24}
                height={24}
                className="inline-block"
              />
              <span className="text-base">My Orders</span>
            </button>
            <button
              className="flex items-center gap-3 px-2 py-3 rounded-lg hover:bg-gray-50 font-medium text-left text-red-600 transition mt-2"
              onClick={() => {
                dispatch(logout());
              }}
            >
              <img
                src="/icons/logout.svg"
                alt="Logout"
                width={24}
                height={24}
                className="inline-block"
              />
              <span className="text-base">Logout</span>
            </button>
          </aside>

          <section className="flex-1 flex flex-col items-center md:items-start">
            <h2 className="font-extrabold text-2xl md:text-3xl text-gray-900 mb-6 w-full md:w-auto">
              Profile
            </h2>
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-[0_4px_24px_0_rgba(0,0,0,0.06)] p-6 flex flex-col items-start">
              <img
                src={getAvatar(user || undefined)}
                alt={user?.name || 'User'}
                className="w-20 h-20 rounded-full object-cover  mb-4"
              />
              <div className="w-full flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-950">Name</span>
                  <span className="font-bold text-gray-950">{user?.name}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-950">Email</span>
                  <span className="font-bold text-gray-950">{user?.email}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-950">Handphone Number</span>
                  <span className="font-bold text-gray-950">{phone}</span>
                </div>
                {/* Update Profile Modal Trigger */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-primary text-white font-semibold h-11 rounded-full text-base hover:bg-red-700 transition mt-4">
                      Update Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white shadow-lg border-none">
                    <div className="flex items-center justify-between mb-2">
                      <DialogHeader>
                        <DialogTitle>Update Profile</DialogTitle>
                      </DialogHeader>
                      <DialogClose asChild>
                        <button
                          type="button"
                          className="rounded-md p-1 hover:bg-gray-300 focus:outline-none"
                          aria-label="Close"
                        >
                          <X className="w-6 h-6 text-gray-900" />
                        </button>
                      </DialogClose>
                    </div>
                    <form onSubmit={handleUpdateProfile} className="space-y-4 mt-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name</label>
                        <input
                          type="text"
                          className={`w-full border rounded-xl p-2 pr-10 shadow focus:ring-1 focus:shadow-md focus:ring-gray-500 focus:outline-none ${
                            profileErrors.name ? 'border-primary bg-red-50' : 'border-gray-300'
                          }`}
                          value={name}
                          onChange={e => {
                            setName(e.target.value);
                            setProfileErrors(prev => ({ ...prev, name: '' }));
                          }}
                          onBlur={e => validateProfileField('name', e.target.value)}
                        />
                        {profileErrors.name && (
                          <div className="w-full mt-1 text-left text-primary text-sm font-semibold">
                            {profileErrors.name}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Handphone Number</label>
                        <input
                          type="text"
                          className={`w-full border rounded-xl p-2 pr-10 shadow focus:ring-1 focus:shadow-md focus:ring-gray-500 focus:outline-none ${
                            profileErrors.handphone ? 'border-primary bg-red-50' : 'border-gray-300'
                          }`}
                          value={handphone}
                          onChange={e => {
                            setHandphone(e.target.value);
                            setProfileErrors(prev => ({ ...prev, handphone: '' }));
                          }}
                          onBlur={e => validateProfileField('handphone', e.target.value)}
                        />
                        {profileErrors.handphone && (
                          <div className="w-full mt-1 text-left text-primary text-sm font-semibold">
                            {profileErrors.handphone}
                          </div>
                        )}
                      </div>
                      <DialogFooter className="gap-2 mt-4 flex flex-row justify-end">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-10 px-6 rounded-full font-semibold text-base hover:bg-gray-300 transition"
                            disabled={loadingProfile}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          className="h-10 px-6 bg-primary text-white rounded-full font-semibold text-base hover:bg-red-700 transition"
                          disabled={loadingProfile}
                        >
                          {loadingProfile ? 'Saving...' : 'Save'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
                {/* Change Password Modal Trigger */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gray-200 text-primary font-semibold h-11 rounded-full text-base hover:bg-gray-300 transition mt-2">
                      Change Password
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-white shadow-lg border-none">
                    <div className="flex items-center justify-between mb-2">
                      <DialogHeader>
                        <DialogTitle>Change Password</DialogTitle>
                      </DialogHeader>
                      <DialogClose asChild>
                        <button
                          type="button"
                          className="rounded-sm p-1 hover:bg-gray-300 focus:outline-none"
                          aria-label="Close"
                        >
                          <X className="w-6 h-6 text-gray-900" />
                        </button>
                      </DialogClose>
                    </div>
                    <form onSubmit={handleChangePassword} className="space-y-4 mt-2">
                      <div>
                        <label className="block text-sm font-medium mb-1">Current Password</label>
                        <div className="relative">
                          <input
                            type={showCurrentPassword ? 'text' : 'password'}
                            className={`w-full rounded-xl p-2 pr-10 shadow focus:ring-1 focus:shadow-md focus:ring-gray-500 focus:outline-none border
                              ${passwordErrors.currentPassword ? 'border-primary bg-red-50' : 'border-gray-300'}
                            `}
                            value={currentPassword}
                            onChange={(e) => {
                              setCurrentPassword(e.target.value);
                              setPasswordErrors((prev) => ({ ...prev, currentPassword: '' }));
                            }}
                            onBlur={(e) => validatePasswordField('currentPassword', e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-0 m-0 bg-transparent border-none outline-none"
                            tabIndex={-1}
                            onClick={() => setShowCurrentPassword((v) => !v)}
                            aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                          >
                            {showCurrentPassword ? EyeOpen : EyeClosed}
                          </button>
                        </div>
                        {passwordErrors.currentPassword && (
                          <div className="w-full mt-1 text-left text-primary text-sm font-semibold">
                            {passwordErrors.currentPassword}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">New Password</label>
                        <div className="relative">
                          <input
                            type={showNewPassword ? 'text' : 'password'}
                            className={`w-full rounded-xl p-2 pr-10 shadow focus:ring-1 focus:shadow-md focus:ring-gray-500 focus:outline-none border ${
                              passwordErrors.newPassword ? 'border-primary bg-red-50' : 'border-gray-300'
                            }`}
                            value={newPassword}
                            onChange={(e) => {
                              setNewPassword(e.target.value);
                              setPasswordErrors((prev) => ({ ...prev, newPassword: '' }));
                            }}
                            onBlur={(e) => validatePasswordField('newPassword', e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-0 m-0 bg-transparent border-none outline-none"
                            tabIndex={-1}
                            onClick={() => setShowNewPassword((v) => !v)}
                            aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                          >
                            {showNewPassword ? EyeOpen : EyeClosed}
                          </button>
                        </div>
                        {passwordErrors.newPassword && (
                          <div className="w-full mt-1 text-left text-primary text-sm font-semibold">
                            {passwordErrors.newPassword}
                          </div>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            className={`w-full rounded-xl p-2 pr-10 shadow focus:ring-1 focus:shadow-md focus:ring-gray-500 focus:outline-none border ${
                              passwordErrors.confirmPassword ? 'border-primary bg-red-50' : 'border-gray-300'
                            }`}
                            value={confirmPassword}
                            onChange={(e) => {
                              setConfirmPassword(e.target.value);
                              setPasswordErrors((prev) => ({ ...prev, confirmPassword: '' }));
                            }}
                            onBlur={(e) => validatePasswordField('confirmPassword', e.target.value)}
                          />
                          <button
                            type="button"
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 p-0 m-0 bg-transparent border-none outline-none"
                            tabIndex={-1}
                            onClick={() => setShowConfirmPassword((v) => !v)}
                            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                          >
                            {showConfirmPassword ? EyeOpen : EyeClosed}
                          </button>
                        </div>
                        {passwordErrors.confirmPassword && (
                          <div className="w-full mt-1 text-left text-primary text-sm font-semibold">
                            {passwordErrors.confirmPassword}
                          </div>
                        )}
                      </div>
                      <DialogFooter className="gap-2 mt-4 flex flex-row justify-end">
                        <DialogClose asChild>
                          <Button
                            type="button"
                            variant="outline"
                            className="h-10 px-6 rounded-full font-semibold text-base hover:bg-gray-300 transition"
                            disabled={loadingPassword}
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          className="h-10 px-6 bg-primary text-white rounded-full font-semibold text-base hover:bg-red-700 transition"
                          disabled={loadingPassword}
                        >
                          {loadingPassword ? 'Saving...' : 'Save'}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}