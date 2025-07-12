import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useGetFullUserDetailsQuery } from '@/features/admin/adminApiService';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import StatusBadge from '@/components/ui/StatusBadge';
import { Building, Briefcase, Mail, Phone, MapPin, Globe, Book, Star, GraduationCap } from 'lucide-react';

interface UserDetailsModalProps {
    userId: string;
    onClose: () => void;
}

interface DetailItemProps {
    icon: React.ReactNode;
    label: string;
    children?: React.ReactNode;
}

const DetailItem = ({ icon, label, children }: DetailItemProps) => (
    children ? <div className="text-sm flex items-start"><span className="mr-2.5 mt-1 text-muted-foreground flex-shrink-0">{icon}</span><div><strong>{label}:</strong> {children}</div></div> : null
);

const UserDetailsModal = ({ userId, onClose }: UserDetailsModalProps) => {
    const { data: userDetails, isLoading, isError } = useGetFullUserDetailsQuery(userId, { skip: !userId });

    const renderContent = () => {
        if (isLoading) return (
            <div className="space-y-6 pt-4">
                <div className="flex justify-between items-start">
                    <div className="space-y-2"><Skeleton className="h-6 w-48" /><Skeleton className="h-4 w-64" /></div>
                    <Skeleton className="h-6 w-20 rounded-md" />
                </div>
                <div className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </div>
        );
        if (isError || !userDetails) return <p className="py-8 text-center text-red-500">Could not load user details. Please try again.</p>;

        const { user, profile, jobs } = userDetails;
        const roleName = user.role === "employer" || user.role === "employee" ? "Teacher" : user.role === "college" ? "Institution" : user.role;

        return (
            <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-4 -mr-4 pt-2">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
                    <div>
                        <h3 className="font-bold text-xl">{profile?.name || user.email}</h3>
                        <p className="text-muted-foreground flex items-center gap-2"><Mail size={14} />{user.email}</p>
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                        <Badge variant="secondary" className="capitalize">{roleName}</Badge>
                        <StatusBadge status={user.status}><span className="capitalize">{user.status}</span></StatusBadge>
                    </div>
                </div>

                {(user.role === 'employer' || user.role === 'employee') && profile && (
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg space-y-3">
                            <h4 className="font-semibold text-md flex items-center gap-2 mb-2"><Phone size={16} />Contact & Location</h4>
                            <DetailItem icon={<Book size={14} />} label="Subject">{profile.headline}</DetailItem>
                            <DetailItem icon={<MapPin size={14} />} label="Location">{profile.location}</DetailItem>
                            <DetailItem icon={<Phone size={14} />} label="Phone">{profile.phone}</DetailItem>
                        </div>
                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold text-md flex items-center gap-2 mb-2"><Star size={16} />Skills</h4>
                            <div className="flex flex-wrap gap-2">{profile.skills?.length > 0 ? profile.skills.map((skill: any) => <Badge key={skill._id} variant="outline">{skill.name}</Badge>) : <p className="text-sm text-muted-foreground">No skills listed.</p>}</div>
                        </div>
                        <div className="p-4 border rounded-lg space-y-3">
                            <h4 className="font-semibold text-md flex items-center gap-2 mb-2"><Briefcase size={16} />Work Experience ({profile.workExperience?.length || 0})</h4>
                            {profile.workExperience?.length > 0 ? profile.workExperience.map((exp: any) => <div key={exp._id}><p className="text-sm font-medium">{exp.title} at {exp.company}</p><p className="text-xs text-muted-foreground">{exp.duration}</p></div>) : <p className="text-sm text-muted-foreground">No work experience provided.</p>}
                        </div>
                        <div className="p-4 border rounded-lg space-y-3">
                            <h4 className="font-semibold text-md flex items-center gap-2 mb-2"><GraduationCap size={16} />Education ({profile.education?.length || 0})</h4>
                            {profile.education?.length > 0 ? profile.education.map((edu: any) => <div key={edu._id}><p className="text-sm font-medium">{edu.degree} from {edu.school}</p><p className="text-xs text-muted-foreground">{edu.year}</p></div>) : <p className="text-sm text-muted-foreground">No education details provided.</p>}
                        </div>
                    </div>
                )}

                {user.role === 'college' && profile && (
                    <div className="space-y-4">
                        <div className="p-4 border rounded-lg space-y-3">
                            <h4 className="font-semibold text-md flex items-center gap-2 mb-2">
                                <Building size={16} />Institution Details
                            </h4>
                            <DetailItem icon={<MapPin size={14} />} label="Address">
                                {profile.address}
                            </DetailItem>
                            <DetailItem icon={<Phone size={14} />} label="Phone">
                                {profile.phone}
                            </DetailItem>
                            <DetailItem icon={<Globe size={14} />} label="Website">
                                <a
                                    href={profile.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:underline"
                                >
                                    {profile.website}
                                </a>
                            </DetailItem>

                            {/* Contact Person Details */}
                            {profile.contactPerson && (
                                <div className="mt-4 border-t pt-4 space-y-2">
                                    <h5 className="font-semibold text-sm text-muted-foreground">
                                        Contact Person
                                    </h5>
                                    <DetailItem icon={<span className="font-bold">👤</span>} label="Name">
                                        {profile.contactPerson.name}
                                    </DetailItem>
                                    <DetailItem icon={<span className="font-bold">@</span>} label="Email">
                                        {profile.contactPerson.email}
                                    </DetailItem>
                                    <DetailItem icon={<Phone size={14} />} label="Phone">
                                        {profile.contactPerson.phone}
                                    </DetailItem>
                                    <DetailItem icon={<span className="font-bold">🏢</span>} label="Position">
                                        {profile.contactPerson.position}
                                    </DetailItem>
                                </div>
                            )}
                        </div>

                        <div className="p-4 border rounded-lg">
                            <h4 className="font-semibold text-md flex items-center gap-2 mb-2">
                                <Briefcase size={16} />
                                Jobs Posted ({jobs?.length || 0})
                            </h4>
                            {jobs?.length > 0 ? (
                                <ul className="list-disc list-inside text-sm space-y-1">
                                    {jobs.map((job: any) => (
                                        <li key={job._id}>{job.title}</li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-sm text-muted-foreground">
                                    This Institution has not posted any jobs yet.
                                </p>
                            )}
                        </div>
                    </div>
                )}

            </div>
        );
    };

    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader><DialogTitle>User Profile Details</DialogTitle><DialogDescription>A complete overview of the selected user and their platform activity.</DialogDescription></DialogHeader>
                {renderContent()}
            </DialogContent>
        </Dialog>
    );
};

export default UserDetailsModal;
