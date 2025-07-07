import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { useUpdateEmployerProfileDetailsMutation } from '@/features/profile/employerProfileApiService';
import toast from 'react-hot-toast';
import { EmployerProfile } from '@/types/employer';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: EmployerProfile;
}

export const ContactModal = ({ isOpen, onClose, profile }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    headline: '',
    location: '',
    phone: '',
    demoVideoUrl: '',
    currentSalary: '',
    expectedSalary: '',
  });

  const [updateDetails, { isLoading }] = useUpdateEmployerProfileDetailsMutation();

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        headline: profile.headline || '',
        location: profile.location || '',
        phone: profile.phone || '',
        demoVideoUrl: profile.demoVideoUrl || '',
        currentSalary: profile.currentSalary || '',
        expectedSalary: profile.expectedSalary || '',
      });
    }
  }, [profile, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const loadingToast = toast.loading('Updating profile...');
    try {
      await updateDetails(formData).unwrap();
      toast.success('Profile updated successfully!', { id: loadingToast });
      onClose();
    } catch (error) {
      toast.error('Failed to update profile.', { id: loadingToast });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Edit Profile Details</DialogTitle>
          <DialogDescription>Update your personal details, salary, and video link here.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" name="headline" value={formData.headline} onChange={handleChange} placeholder="e.g., Physics Teacher" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Noida, Uttar Pradesh" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
              <Label htmlFor="demoVideoUrl">Demo Video URL</Label>
              <Input id="demoVideoUrl" name="demoVideoUrl" type="url" value={formData.demoVideoUrl} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <Label htmlFor="currentSalary">Current Salary (per annum)</Label>
                <Input id="currentSalary" name="currentSalary" value={formData.currentSalary} onChange={handleChange} placeholder="e.g., 5,00,000"/>
            </div>
            <div className="space-y-2">
                <Label htmlFor="expectedSalary">Expected Salary (per annum)</Label>
                <Input id="expectedSalary" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} placeholder="e.g., 6,50,000"/>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>Cancel</Button>
            <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Changes'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
