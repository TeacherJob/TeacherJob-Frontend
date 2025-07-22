import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone, Download, Briefcase, GraduationCap, User, FileText, Sparkles, Loader2, MapPin, Coins, Link as LinkIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { useGenerateAiResumeMutation } from '@/features/profile/employerProfileApiService';
import { EmployerProfile as EmployerProfileType, Skill } from '@/types/employer';

const maskEmail = (email: string) => {
    if (!email) return "N/A";
    const [user, domain] = email.split("@");
    if (!domain) return email;
    const maskedUser = user.length <= 2 ? user[0] + '***' : user.slice(0, 2) + '***';
    return `${maskedUser}@${domain}`;
};

const maskPhone = (phone: string) => {
    if (!phone || phone.length < 10) return "N/A";
    return phone.slice(0, 2) + '******' + phone.slice(-2);
};

const AnandResumeTemplateForDownload = React.forwardRef<HTMLDivElement, { profile: EmployerProfileType }>(({ profile }, ref) => {
    return (
        <div ref={ref} className="bg-white font-sans" style={{ width: '210mm' }}>
            <div className="flex min-h-fit flex-col">
                <div className="flex w-full">
                    <div className="w-[35%] bg-slate-800 text-white p-8 flex flex-col">
                        <div className="flex justify-center mb-8">
                            {profile.profilePicture?.url ? 
                                <img id="profile-pic-pdf" src={profile.profilePicture.url} alt={profile.name} className="w-40 h-40 rounded-full object-cover border-4 border-slate-600" crossOrigin="anonymous" />
                                : <div className="w-40 h-40 rounded-full border-4 border-slate-600 bg-slate-700"></div>
                            }
                        </div>
                        <div className="space-y-3 text-sm">
                            <div id="pdf-link-phone" className="flex items-center gap-3">
                                <Phone size={16} className="text-yellow-400 flex-shrink-0" /> <span>{maskPhone(profile.phone)}</span>
                            </div>
                            <div id="pdf-link-email" className="flex items-center gap-3">
                                <Mail size={16} className="text-yellow-400 flex-shrink-0" /> <span>{maskEmail(profile.email)}</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <MapPin size={16} className="text-yellow-400 flex-shrink-0 mt-1" /> <span>{profile.location || 'N/A'}</span>
                            </div>
                        </div>
                        
                        <div className="mt-8">
                            <h2 className="text-xl font-bold uppercase tracking-wider">Education</h2>
                            <div className="h-0.5 w-12 bg-yellow-400 mt-2 mb-6"></div>
                            <div className="space-y-5">
                                {profile.education?.map(edu => (
                                    <div key={edu._id}>
                                        <h3 className="font-bold text-base">{edu.degree}</h3>
                                        <p className="text-sm text-slate-300">{edu.school}</p>
                                        <p className="text-xs text-slate-400">{edu.year}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-xl font-bold uppercase tracking-wider">Salary</h2>
                            <div className="h-0.5 w-12 bg-yellow-400 mt-2 mb-6"></div>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between"><span>Current:</span> <span className="font-semibold">{profile.currentSalary || 'N/A'}</span></div>
                                <div className="flex justify-between"><span>Expected:</span> <span className="font-semibold">{profile.expectedSalary || 'N/A'}</span></div>
                            </div>
                        </div>
                    </div>

                    <div className="w-[65%] p-8">
                        <div className="bg-yellow-400 text-slate-800 p-8 text-left -ml-16 -mr-8 mb-8">
                            <h1 className="text-5xl font-extrabold uppercase tracking-wider">{profile.name}</h1>
                            <p className="text-lg font-medium mt-1">{profile.headline}</p>
                        </div>

                        {profile.summary && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-slate-700 uppercase tracking-wide relative inline-block">Objective<span className="absolute -bottom-2 left-0 w-full h-1 bg-slate-200"></span></h2>
                                <p className="mt-6 text-slate-600 text-base leading-relaxed">{profile.summary}</p>
                            </div>
                        )}

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-700 uppercase tracking-wide relative inline-block">Experience<span className="absolute -bottom-2 left-0 w-full h-1 bg-slate-200"></span></h2>
                            <div className="mt-8 relative border-l-2 border-slate-300 pl-8 space-y-10">
                                {profile.workExperience?.map((exp) => (
                                    <div key={exp._id} className="relative">
                                        <div className="absolute -left-[37px] top-1 w-4 h-4 bg-yellow-400 rounded-full border-4 border-white"></div>
                                        <p className="text-xs font-semibold text-slate-500">{exp.duration}</p>
                                        <h3 className="text-xl font-bold text-slate-800">{exp.title}</h3>
                                        <p className="text-base font-medium text-slate-600">{exp.company}</p>
                                        {exp.description && (
                                            <ul className="mt-2 list-disc list-inside text-slate-600 space-y-1 text-sm">
                                                {exp.description.map((item, i) => <li key={`${exp._id}-desc-${i}`}>{item}</li>)}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-700 uppercase tracking-wide relative inline-block">Skills<span className="absolute -bottom-2 left-0 w-full h-1 bg-slate-200"></span></h2>
                            <div className="mt-6 space-y-4">
                                {profile.skills && Array.isArray(profile.skills) ? (
                                    <ul className="grid grid-cols-2 gap-x-8 gap-y-2">
                                        {profile.skills.map((skill: Skill) => (
                                            <li key={skill._id} className="flex items-center gap-3 text-slate-700"><span className="h-2 w-2 bg-slate-800 rounded-full"></span><span>{skill.name}</span></li>
                                        ))}
                                    </ul>
                                ) : (
                                    profile.skills && Object.entries(profile.skills).map(([category, skillsList]) => (
                                        (skillsList as any).length > 0 && (
                                            <div key={category}>
                                                <h4 className="font-bold text-slate-800 capitalize tracking-wide text-lg">{category}</h4>
                                                <ul className="mt-2 grid grid-cols-2 gap-x-8 gap-y-2">
                                                    {(skillsList as any).map((skill: any, i: number) => (
                                                        <li key={skill.name || skill || i} className="flex items-center gap-3 text-slate-700"><span className="h-2 w-2 bg-slate-800 rounded-full"></span><span>{skill.name || skill}</span></li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )
                                    ))
                                )}
                            </div>
                        </div>
                        
                        <div>
                            <h2 className="text-2xl font-bold text-slate-700 uppercase tracking-wide relative inline-block">Documents & Links<span className="absolute -bottom-2 left-0 w-full h-1 bg-slate-200"></span></h2>
                            <div className="mt-6 space-y-3">
                                {profile.demoVideoUrl && (
                                    <div id="pdf-link-demo" className="flex items-center gap-3">
                                        <LinkIcon size={16} className="text-slate-600 flex-shrink-0" />
                                        <span className="text-blue-600 break-all">{profile.demoVideoUrl}</span>
                                    </div>
                                )}
                                {profile.documents?.map((doc, index) => (
                                    <div key={doc.public_id} id={`pdf-link-doc-${index}`} className="flex items-center gap-3">
                                        <FileText size={16} className="text-slate-600 flex-shrink-0" />
                                        <span className="text-blue-600 break-all">{doc.name || 'View Document'}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export const ViewProfileModal = ({ application, onClose }: { application: any, onClose: () => void }) => {
    const [generateAiResume, { isLoading: isGeneratingResume }] = useGenerateAiResumeMutation();
    const [downloadableProfile, setDownloadableProfile] = useState<EmployerProfileType | null>(null);
    const resumeTemplateRef = useRef<HTMLDivElement>(null);

    const addLinksToPdf = (pdf: jsPDF, element: HTMLElement, scale: number) => {
        const linkElements = element.querySelectorAll<HTMLDivElement>('[id^="pdf-link-"]');
        const A4_WIDTH_MM = 210;
        const A4_HEIGHT_MM = 297;
        const elementBounds = element.getBoundingClientRect();
    
        linkElements.forEach(linkEl => {
            const linkBounds = linkEl.getBoundingClientRect();
            const url = linkEl.querySelector('span')?.textContent || '';
            let finalUrl = '';
    
            if (linkEl.id === 'pdf-link-email' && downloadableProfile?.email) finalUrl = `mailto:${downloadableProfile.email}`;
            if (linkEl.id === 'pdf-link-phone' && downloadableProfile?.phone) finalUrl = `tel:${downloadableProfile.phone}`;
            if (linkEl.id === 'pdf-link-demo' && downloadableProfile?.demoVideoUrl) finalUrl = downloadableProfile.demoVideoUrl;
            if (linkEl.id.startsWith('pdf-link-doc-') && downloadableProfile?.documents) {
                const index = parseInt(linkEl.id.split('-')[3]);
                if (downloadableProfile.documents[index]) {
                    finalUrl = downloadableProfile.documents[index].url;
                }
            }
            if (!finalUrl) return;

            const x = ((linkBounds.left - elementBounds.left) * (A4_WIDTH_MM / elementBounds.width));
            const y = ((linkBounds.top - elementBounds.top) * (A4_WIDTH_MM / elementBounds.width));
            const w = (linkBounds.width * (A4_WIDTH_MM / elementBounds.width));
            const h = (linkBounds.height * (A4_WIDTH_MM / elementBounds.width));
            
            const pageNumber = Math.floor(y / A4_HEIGHT_MM) + 1;
            const yOnPage = y % A4_HEIGHT_MM;
    
            pdf.setPage(pageNumber);
            pdf.link(x, yOnPage, w, h, { url: finalUrl });
        });
    };

    useEffect(() => {
        const createAndDownloadPdf = async () => {
            const resumeElement = resumeTemplateRef.current;
            if (!resumeElement || !downloadableProfile || !downloadableProfile.name) {
                setDownloadableProfile(null);
                return;
            }
            
            const loadingToast = toast.loading("Generating professional PDF...");

            try {
                const canvas = await html2canvas(resumeElement, { scale: 2.5, useCORS: true, allowTaint: true });
                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                const ratio = canvas.width / canvas.height;
                const imgWidth = pdfWidth;
                const imgHeight = imgWidth / ratio;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                heightLeft -= pdfHeight;

                while (heightLeft > 0) {
                    position -= pdfHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pdfHeight;
                }
                
                addLinksToPdf(pdf, resumeElement, 2.5);

                pdf.save(`${downloadableProfile.name}-AI-Resume.pdf`);
                toast.success("Resume downloaded successfully!", { id: loadingToast });
            } catch (err) {
                console.error("PDF Generation Error: ", err);
                toast.error("Failed to generate PDF.", { id: loadingToast });
            } finally {
                setDownloadableProfile(null);
            }
        };

        if (downloadableProfile) {
            setTimeout(createAndDownloadPdf, 200);
        }
    }, [downloadableProfile]);

    if (!application) return null;

    const profile = application.user.employerProfile;

    const handleDownloadAiResume = async () => {
        if (!profile) {
            toast.error("Profile data is not available.");
            return;
        }
        
        try {
            const enhancedData = await generateAiResume(profile).unwrap();
            const mergedProfile = { ...profile, ...enhancedData, email: application.user.email, name: profile.name };
            setDownloadableProfile(mergedProfile);
        } catch (error) {
            const errorMessage = (error as any)?.data?.error || "Could not generate AI resume.";
            toast.error(errorMessage);
        }
    };

    return (
        <>
            <Dialog open={true} onOpenChange={onClose}>
                <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="text-2xl">{profile.name}</DialogTitle>
                        <DialogDescription>{profile.headline}</DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 overflow-y-auto pr-2 flex-grow">
                        <div className="md:col-span-1 space-y-4 border-r pr-4">
                            <div className="flex flex-col items-center">
                                {profile.profilePicture?.url ?
                                    <img src={profile.profilePicture.url} alt={profile.name} className="w-24 h-24 rounded-full object-cover mb-4" />
                                    :
                                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
                                        <User className="w-12 h-12 text-muted-foreground" />
                                    </div>
                                }
                            </div>
                            <Separator />
                            <h4 className="font-semibold">Contact Information</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2"><Mail size={14} className="text-muted-foreground" /><span>{maskEmail(application.user.email)}</span></div>
                                <div className="flex items-center gap-2"><Phone size={14} className="text-muted-foreground" /><span>{maskPhone(profile.phone)}</span></div>
                            </div>
                            <Separator />
                            <h4 className="font-semibold">Salary Information</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex items-center gap-2"><Coins size={14} className="text-muted-foreground" />Current Salary:<span>{profile.currentSalary}</span></div>
                                <div className="flex items-center gap-2"><Coins size={14} className="text-muted-foreground" />Expected Salary:<span>{profile.expectedSalary}</span></div>
                            </div>
                            <Separator />

                            <h4 className="font-semibold">Skills</h4>
                            <div className="flex flex-wrap gap-2">
                                {profile.skills?.length > 0 ? profile.skills.map((skill: any) => (<Badge key={skill._id} variant="secondary">{skill.name}</Badge>)) : <p className="text-sm text-muted-foreground">No skills listed.</p>}
                            </div>
                        </div>
                        <div className="md:col-span-2 space-y-6">
                            <div>
                                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><Briefcase size={18} />Work Experience</h4>
                                <div className="space-y-4">
                                    {profile.workExperience?.length > 0 ? profile.workExperience.map((exp: any) => (
                                        <div key={exp._id} className="pl-4 border-l-2 border-border">
                                            <p className="font-semibold">{exp.title}</p>
                                            <p className="text-sm">{exp.company}</p>
                                            <p className="text-xs text-muted-foreground">{exp.duration}</p>
                                        </div>
                                    )) : <p className="text-sm text-muted-foreground">No work experience provided.</p>}
                                </div>
                            </div>
                            <Separator />
                            <div>
                                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><GraduationCap size={18} />Education</h4>
                                <div className="space-y-4">
                                    {profile.education?.length > 0 ? profile.education.map((edu: any) => (
                                        <div key={edu._id} className="pl-4 border-l-2 border-border">
                                            <p className="font-semibold">{edu.degree}</p>
                                            <p className="text-sm">{edu.school}</p>
                                            <p className="text-xs text-muted-foreground">{edu.year}</p>
                                        </div>
                                    )) : <p className="text-sm text-muted-foreground">No education details provided.</p>}
                                </div>
                            </div>
                            <Separator />
                            <h4 className="font-semibold">Demo Video</h4>
                            <div className="space-y-2 text-sm">
                                {profile.demoVideoUrl ?
                                    <a target='_blank' rel="noreferrer" href={profile.demoVideoUrl} className="text-blue-600 hover:underline">View Demo Video</a>
                                    : <p className="text-muted-foreground">No demo video provided.</p>
                                }
                            </div>
                            <Separator />
                            <div>
                                <h4 className="font-semibold text-lg mb-3 flex items-center gap-2"><FileText size={18} />Documents</h4>
                                <div className="space-y-2">
                                    {profile.documents?.length > 0 ? profile.documents.map((doc: any) => (
                                        <a key={doc.public_id} href={doc.url} target="_blank" rel="noreferrer" className="flex items-center justify-between p-2 bg-muted/50 rounded-md hover:bg-muted">
                                            <span className="text-sm font-medium truncate">{doc.name}</span>
                                            <Download size={16} />
                                        </a>
                                    )) : <p className="text-sm text-muted-foreground">No documents uploaded.</p>}
                                </div>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={onClose}>Close</Button>
                        <Button onClick={handleDownloadAiResume} disabled={isGeneratingResume}>
                            {isGeneratingResume ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                            Download Resume
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
            <div style={{ position: 'fixed', left: '-2000px', top: 0, zIndex: -1 }}>
                {downloadableProfile && <AnandResumeTemplateForDownload ref={resumeTemplateRef} profile={downloadableProfile} />}
            </div>
        </>
    );
};
