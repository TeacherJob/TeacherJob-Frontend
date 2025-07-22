import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import { X, Download, Loader2, Mail, Phone, MapPin, Link as LinkIcon, FileText } from 'lucide-react';
import { EmployerProfile as EmployerProfileType, Skill } from '@/types/employer';

const CircularProgress = ({ percentage }: { percentage: number }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;
    return (
        <div className="relative flex items-center justify-center w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 120 120">
                <circle className="text-slate-600" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" />
                <circle className="text-yellow-400" strokeWidth="8" stroke="currentColor" fill="transparent" r={radius} cx="60" cy="60" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90 60 60)" />
            </svg>
            <span className="absolute text-2xl font-bold text-white">{`${percentage}%`}</span>
        </div>
    );
};

const AnandResumeTemplate = React.forwardRef<HTMLDivElement, { profile: EmployerProfileType }>(({ profile }, ref) => {
    return (
        <div ref={ref} id="resume-to-download" className="bg-white font-sans" style={{ width: '210mm' }}>
            <div className="flex min-h-fit flex-col">
                <div className="flex w-full">
                    <div className="w-[35%] bg-slate-800 text-white p-8 flex flex-col">
                        <div className="flex justify-center mb-8">
                            {profile.profilePicture?.url ? 
                                <img src={profile.profilePicture.url} alt={profile.name} className="w-40 h-40 rounded-full object-cover border-4 border-slate-600" crossOrigin="anonymous" />
                                : <div className="w-40 h-40 rounded-full border-4 border-slate-600 bg-slate-700"></div>
                            }
                        </div>
                        <div className="space-y-3 text-sm">
                            <div data-link={`tel:${profile.phone}`} className="flex items-center gap-3">
                                <Phone size={16} className="text-yellow-400 flex-shrink-0" /> <span>{profile.phone || 'N/A'}</span>
                            </div>
                            <div data-link={`mailto:${profile.email}`} className="flex items-center gap-3">
                                <Mail size={16} className="text-yellow-400 flex-shrink-0" /> <span>{profile.email}</span>
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
                            <h2 className="text-xl font-bold uppercase tracking-wider">Profile Vitals</h2>
                            <div className="h-0.5 w-12 bg-yellow-400 mt-2 mb-6"></div>
                            <div className="space-y-4 text-sm">
                                <div className="flex justify-between"><span>Current Salary:</span> <span className="font-semibold">{profile.currentSalary || 'N/A'}</span></div>
                                <div className="flex justify-between"><span>Expected Salary:</span> <span className="font-semibold">{profile.expectedSalary || 'N/A'}</span></div>
                            </div>
                            <div className="mt-6 flex flex-col items-center">
                                <span className="text-sm uppercase font-semibold tracking-wider">Profile Strength</span>
                                <CircularProgress percentage={profile.profileStrength || 0} />
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
                                    <div data-link={profile.demoVideoUrl} className="flex items-center gap-3">
                                        <LinkIcon size={16} className="text-slate-600 flex-shrink-0" />
                                        <span className="text-blue-600 break-all">{profile.demoVideoUrl}</span>
                                    </div>
                                )}
                                {profile.documents?.map((doc) => (
                                    <div key={doc.public_id} data-link={doc.url} className="flex items-center gap-3">
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

export const AIResumePreviewModal: React.FC<{ isOpen: boolean; onClose: () => void; profile: EmployerProfileType | null; }> = ({ isOpen, onClose, profile }) => {
  const resumeRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = React.useState(false);

  const handleDownloadPdf = async () => {
    const resumeElement = resumeRef.current;
    if (!resumeElement || !profile || !profile.name) {
      toast.error("Profile data is incomplete. Cannot generate PDF.");
      return;
    }
    
    setIsDownloading(true);
    const loadingToast = toast.loading("Generating your professional PDF...");

    try {
        const canvas = await html2canvas(resumeElement, {
            scale: 2.5,
            useCORS: true,
            allowTaint: true,
        });

        const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4', hotfixes: ["px_scaling"] });
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = canvasWidth / canvasHeight;

        const imgWidth = pdfWidth;
        const imgHeight = imgWidth / ratio;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position -= pdfHeight;
            pdf.addPage();
            pdf.addImage(canvas.toDataURL('image/jpeg', 0.95), 'JPEG', 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        const linkElements = resumeElement.querySelectorAll<HTMLDivElement>('[data-link]');
        const scaleFactor = pdfWidth / resumeElement.offsetWidth; 

        linkElements.forEach(linkEl => {
            const url = linkEl.dataset.link;
            if (!url) return;

            const rect = linkEl.getBoundingClientRect();
            const resumeRect = resumeElement.getBoundingClientRect();
            
            const x = (rect.left - resumeRect.left) * scaleFactor;
            const y = (rect.top - resumeRect.top) * scaleFactor;
            const w = rect.width * scaleFactor;
            const h = rect.height * scaleFactor;

            const pageNum = Math.floor(y / pdfHeight) + 1;
            const yOnPage = y % pdfHeight;

            pdf.setPage(pageNum);
            pdf.link(x, yOnPage, w, h, { url });
        });
        
        pdf.save(`${profile.name}-AI-Resume.pdf`);
        toast.success("Resume downloaded successfully!", { id: loadingToast });
    } catch (err) {
        console.error("PDF Generation Error: ", err);
        toast.error("Failed to generate PDF. Please try again.", { id: loadingToast });
    } finally {
        setIsDownloading(false);
        if (isOpen) {
            onClose();
        }
    }
  };

  if (!isOpen || !profile) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[95vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b bg-gray-50 rounded-t-lg">
          <h2 className="text-xl font-semibold text-gray-800">AI-Enhanced Resume Preview</h2>
          <div className="flex items-center gap-4">
            <button onClick={handleDownloadPdf} disabled={isDownloading} className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:bg-indigo-700 disabled:bg-gray-400">
              {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              Download PDF
            </button>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200">
              <X className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="overflow-y-auto p-6 bg-gray-200">
          <div className="flex justify-center shadow-lg">
             <AnandResumeTemplate ref={resumeRef} profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
};
