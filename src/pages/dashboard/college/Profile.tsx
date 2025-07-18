import { useState, useEffect } from 'react';
import { useGetCollegeProfileQuery, useUpdateCollegeProfileDetailsMutation } from '@/features/profile/collegeProfileApiService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Mail, Phone, MapPin, Globe, Users, Award, UserCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Skeleton } from '@/components/ui/skeleton';

const CollegeProfile = () => {
  const { data: profile, isLoading, isError } = useGetCollegeProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateCollegeProfileDetailsMutation();
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    website: '',
    description: '',
    established: '',
    accreditation: '',
    studentCount: '',
    facultyCount: '',
    departments: [] as string[],
    facilities: [] as string[],
    contactPerson: {
      name: '',
      email: '',
      phone: '',
      position: '',
    }
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || '',
        phone: profile.phone || '',
        address: profile.address || '',
        website: profile.website || '',
        description: profile.description || '',
        established: profile.established || '',
        accreditation: profile.accreditation || '',
        studentCount: profile.studentCount || '0',
        facultyCount: profile.facultyCount || '0',
        departments: profile.departments || [],
        facilities: profile.facilities || [],
        contactPerson: profile.contactPerson || { name: '', email: '', phone: '', position: '' },
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleContactPersonChange = (field: string, value: string) => {
    setFormData(prev => ({
        ...prev,
        contactPerson: {
            ...prev.contactPerson,
            [field]: value
        }
    }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData).unwrap();
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (err) {
      toast.error('Failed to update profile. Please try again.');
    }
  };
  
  if (isLoading) {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton className="h-9 w-64" />
                    <Skeleton className="h-4 w-80 mt-2" />
                </div>
                <Skeleton className="h-10 w-24" />
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-1"><CardContent className="p-6"><Skeleton className="h-64 w-full" /></CardContent></Card>
                <div className="lg:col-span-2 space-y-6">
                    <Card><CardHeader><Skeleton className="h-6 w-48" /></CardHeader><CardContent><Skeleton className="h-40 w-full" /></CardContent></Card>
                    <Card><CardHeader><Skeleton className="h-6 w-48" /></CardHeader><CardContent><Skeleton className="h-24 w-full" /></CardContent></Card>
                    <Card><CardHeader><Skeleton className="h-6 w-48" /></CardHeader><CardContent><Skeleton className="h-32 w-full" /></CardContent></Card>
                </div>
            </div>
        </div>
    );
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Failed to load profile data. Please try refreshing the page.</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Institution Profile</h1>
          <p className="text-muted-foreground">Manage your institution's information and settings</p>
        </div>
        <div className='flex gap-2'>
            {isEditing && (
                 <Button onClick={() => setIsEditing(false)} variant="outline">Cancel</Button>
            )}
            <Button 
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isUpdating}
            >
            {isUpdating ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
                <GraduationCap className="w-12 h-12 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">{formData.name}</h3>
              <Badge variant="secondary" className="mb-4">{formData.accreditation}</Badge>
              <div className="space-y-3 w-full text-left">
                {profile?.email && 
                  <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-muted-foreground flex-shrink-0" /><span className="text-sm break-all">{profile.email}</span></div>
                }
                <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-muted-foreground flex-shrink-0" /><span className="text-sm">{formData.phone}</span></div>
                <div className="flex items-center gap-3"><Globe className="w-4 h-4 text-muted-foreground flex-shrink-0" /><span className="text-sm break-all">{formData.website}</span></div>
                <div className="flex items-center gap-3"><MapPin className="w-4 h-4 text-muted-foreground flex-shrink-0" /><span className="text-sm">{formData.address}</span></div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Institution Information</CardTitle><CardDescription>Update your institution's basic details</CardDescription></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="name">Institution Name</Label><Input id="name" value={formData.name} onChange={handleInputChange} disabled={!isEditing} /></div>
                <div><Label htmlFor="established">Year Established</Label><Input id="established" value={formData.established} onChange={handleInputChange} disabled={!isEditing} /></div>
                <div><Label htmlFor="phone">Phone Number</Label><Input id="phone" value={formData.phone} onChange={handleInputChange} disabled={!isEditing} /></div>
                <div><Label htmlFor="website">Website</Label><Input id="website" value={formData.website} onChange={handleInputChange} disabled={!isEditing} /></div>
              </div>
              <div><Label htmlFor="address">Address</Label><Input id="address" value={formData.address} onChange={handleInputChange} disabled={!isEditing}/></div>
              <div><Label htmlFor="description">Institution Description</Label><Textarea id="description" value={formData.description} onChange={handleInputChange} disabled={!isEditing} rows={3}/></div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
                <div className='flex items-center gap-3'>
                    <UserCircle className='w-6 h-6 text-muted-foreground'/>
                    <div>
                        <CardTitle>Contact Person Information</CardTitle>
                        <CardDescription>Details of the person managing this account</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><Label htmlFor="contactPersonName">Full Name</Label><Input id="contactPersonName" value={formData.contactPerson.name} onChange={(e) => handleContactPersonChange('name', e.target.value)} disabled={!isEditing} /></div>
                <div><Label htmlFor="contactPersonPosition">Position / Designation</Label><Input id="contactPersonPosition" value={formData.contactPerson.position} onChange={(e) => handleContactPersonChange('position', e.target.value)} disabled={!isEditing} /></div>
                <div><Label htmlFor="contactPersonEmail">Email</Label><Input id="contactPersonEmail" type="email" value={formData.contactPerson.email} onChange={(e) => handleContactPersonChange('email', e.target.value)} disabled={!isEditing} /></div>
                <div><Label htmlFor="contactPersonPhone">Mobile Number</Label><Input id="contactPersonPhone" value={formData.contactPerson.phone} onChange={(e) => handleContactPersonChange('phone', e.target.value)} disabled={!isEditing} /></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Institution Statistics</CardTitle><CardDescription>Key numbers about your institution</CardDescription></CardHeader>
            <CardContent>
                {isEditing ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="studentCount">Students Enrolled</Label>
                            <Input id="studentCount" type="number" value={formData.studentCount} onChange={handleInputChange} />
                        </div>
{/*                         <div>
                            <Label htmlFor="facultyCount">Faculty Members</Label>
                            <Input id="facultyCount" type="number" value={formData.facultyCount} onChange={handleInputChange} />
                        </div> */}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-foreground">{formData.studentCount || '0'}</p>
                                <p className="text-sm text-muted-foreground">Employee Enrolled</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                                {/* <Award className="w-6 h-6 text-secondary" /> */}
                            </div>
                            {/* <div>
                                <p className="text-2xl font-bold text-foreground">{formData.facultyCount || '0'}</p>
                                <p className="text-sm text-muted-foreground">Faculty Members</p>
                            </div> */}
                        </div>
                    </div>
                )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CollegeProfile;
