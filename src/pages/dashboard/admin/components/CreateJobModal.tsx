import { useState } from 'react';
import { useCreateJobByAdminMutation } from '@/features/admin/adminApiService';
import { useGetCollegesForAdminQuery } from '@/features/api/adminReviewApiService';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import toast from 'react-hot-toast';

interface CreateJobModalProps {
  onClose: () => void;
}

const CreateJobModal = ({ onClose }: CreateJobModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    description: '',
    type: '',
    salary: '',
    postedBy: '',
    requirements: '',
    responsibilities: '',
    department: '',
    subjects: '',
    applicationDeadline: '',
    benefits: ''
  });

  const { data: colleges = [], isLoading: isLoadingColleges } = useGetCollegesForAdminQuery();
  const [createJob, { isLoading: isCreating }] = useCreateJobByAdminMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const selectedCollege = colleges.find(c => c.user === formData.postedBy);
    if (!selectedCollege) {
        toast.error('Please select a valid college.');
        return;
    }

    const jobData = {
        ...formData,
        schoolName: selectedCollege.name,
        subjects: formData.subjects.split(',').map(s => s.trim()).filter(Boolean),
    };
    
    try {
      await createJob(jobData).unwrap();
      toast.success('Job created successfully!');
      onClose();
    } catch (err: any) {
      toast.error(err.data?.message || 'Failed to create job.');
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Create New Job</DialogTitle>
          <DialogDescription>Create a job posting on behalf of a college. Fill in all the required details.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4 max-h-[70vh] overflow-y-auto pr-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="postedBy" className="text-right">College</Label>
            <div className="col-span-3">
              <Select required value={formData.postedBy} onValueChange={(value) => handleSelectChange('postedBy', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={isLoadingColleges ? "Loading colleges..." : "Select a college"} />
                </SelectTrigger>
                <SelectContent>
                  {colleges.map((college) => (
                    <SelectItem key={college._id} value={college.user}>
                      {college.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="title" className="text-right">Title</Label><Input id="title" value={formData.title} onChange={handleChange} className="col-span-3"/></div>
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="location" className="text-right">Location</Label><Input id="location" value={formData.location} onChange={handleChange} className="col-span-3"/></div>
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="salary" className="text-right">Salary</Label><Input id="salary" value={formData.salary} onChange={handleChange} className="col-span-3"/></div>
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="type" className="text-right">Job Type</Label><Input id="type" value={formData.type} onChange={handleChange} className="col-span-3"/></div>
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="department" className="text-right">Department</Label><Input id="department" value={formData.department} onChange={handleChange} className="col-span-3" /></div>
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="subjects" className="text-right">Subjects</Label><Input id="subjects" value={formData.subjects} onChange={handleChange} className="col-span-3" placeholder="Comma-separated, e.g. Physics, Maths"/></div>
          <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="applicationDeadline" className="text-right">Deadline</Label><Input id="applicationDeadline" type="date" value={formData.applicationDeadline} onChange={handleChange} className="col-span-3"/></div>
          <div className="grid grid-cols-4 items-start gap-4"><Label htmlFor="description" className="text-right pt-2">Description</Label><Textarea id="description" value={formData.description} onChange={handleChange} className="col-span-3" rows={3}/></div>
          <div className="grid grid-cols-4 items-start gap-4"><Label htmlFor="requirements" className="text-right pt-2">Requirements</Label><Textarea id="requirements" value={formData.requirements} onChange={handleChange} className="col-span-3" rows={3}/></div>
          <div className="grid grid-cols-4 items-start gap-4"><Label htmlFor="responsibilities" className="text-right pt-2">Responsibilities</Label><Textarea id="responsibilities" value={formData.responsibilities} onChange={handleChange} className="col-span-3" rows={3}/></div>
          <div className="grid grid-cols-4 items-start gap-4"><Label htmlFor="benefits" className="text-right pt-2">Benefits</Label><Textarea id="benefits" value={formData.benefits} onChange={handleChange} className="col-span-3" rows={3} /></div>
          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={isCreating || isLoadingColleges}>
              {isCreating ? 'Creating...' : 'Create Job'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateJobModal;
