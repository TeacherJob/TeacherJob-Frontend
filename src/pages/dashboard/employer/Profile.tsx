import React, { useState, useRef } from "react";
import { Camera, Download, Edit, Plus, Upload, MapPin, Loader2, Trash2, Sparkles } from "lucide-react";
import { useGetEmployerProfileQuery, useDeleteExperienceMutation, useDeleteEducationMutation, useUploadProfilePictureMutation, useUpdateProfileVisibilityMutation, useUploadDocumentMutation, useGenerateAiResumeMutation } from "../../../features/profile/employerProfileApiService";
import toast from "react-hot-toast";
import { WorkExperience, Education, EmployerProfile as EmployerProfileType, Skill } from "@/types/employer";
import { ContactModal } from "./components/ContactModal";
import { ExperienceModal } from "./components/ExperienceModal";
import { EducationModal } from "./components/EducationModal";
import { SkillsModal } from "./components/SkillsModal";
import { AIResumePreviewModal } from "./components/AIResumePreviewModal";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ResumeTemplate = React.forwardRef<HTMLDivElement, { profile: EmployerProfileType }>(({ profile }, ref) => (
  <div ref={ref} className="bg-white p-12" style={{ width: "210mm", minHeight: "297mm" }}>
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
      <p className="text-lg text-gray-600 mt-2">{profile.headline}</p>
      <div className="flex justify-center items-center gap-x-6 gap-y-2 mt-4 text-sm text-gray-500 flex-wrap">
        <span>{profile.email}</span>
        {profile.phone && <span>• {profile.phone}</span>}
        {profile.location && <span>• {profile.location}</span>}
      </div>
      {profile.demoVideoUrl && (
          <div className="mt-2 text-sm text-gray-500">
              <a href={profile.demoVideoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Demo Video Link</a>
          </div>
      )}
    </div>
    <hr className="my-6" />
    <div>
        <h2 className="text-xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">Work Experience</h2>
        <div className="space-y-6">
            {profile.workExperience && profile.workExperience.map((exp) => (
            <div key={exp._id}>
                <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold text-gray-800">{exp.title}</h3>
                <p className="text-sm text-gray-500">{exp.duration}</p>
                </div>
                <p className="text-md text-gray-600">{exp.company} • {exp.location}</p>
            </div>
            ))}
        </div>
    </div>
    <div className="mt-8">
        <h2 className="text-xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">Education</h2>
        <div className="space-y-4">
            {profile.education && profile.education.map((edu) => (
            <div key={edu._id}>
                <div className="flex justify-between items-baseline">
                <h3 className="text-lg font-semibold text-gray-800">{edu.degree}</h3>
                <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
                <p className="text-md text-gray-600">{edu.school}</p>
            </div>
            ))}
        </div>
    </div>
    <div className="mt-8">
        <h2 className="text-xl font-bold text-indigo-700 border-b-2 border-indigo-200 pb-2 mb-4">Skills</h2>
        <div className="flex flex-wrap gap-2">
            {profile.skills && Array.isArray(profile.skills) && profile.skills.map((skill) => (
                <span key={skill._id} className="bg-gray-100 text-gray-700 text-sm font-medium px-3 py-1 rounded-full">{skill.name}</span>
            ))}
        </div>
    </div>
  </div>
));

const MyProfile = () => {
    const { data: profile, isLoading, isError, refetch } = useGetEmployerProfileQuery();
    const [isContactModalOpen, setContactModalOpen] = useState(false);
    const [isExperienceModalOpen, setExperienceModalOpen] = useState(false);
    const [editingExperience, setEditingExperience] = useState<WorkExperience | null>(null);
    const [isEducationModalOpen, setEducationModalOpen] = useState(false);
    const [editingEducation, setEditingEducation] = useState<Education | null>(null);
    const [isSkillsModalOpen, setSkillsModalOpen] = useState(false);
    const [isAiResumeModalOpen, setAiResumeModalOpen] = useState(false);
    const [aiEnhancedProfile, setAiEnhancedProfile] = useState<EmployerProfileType | null>(null);

    const [deleteExperience] = useDeleteExperienceMutation();
    const [deleteEducation] = useDeleteEducationMutation();
    const [uploadProfilePicture, { isLoading: isUploadingPicture }] = useUploadProfilePictureMutation();
    const [uploadDocument, { isLoading: isUploadingDoc }] = useUploadDocumentMutation();
    const [updateVisibility, { isLoading: isUpdatingVisibility }] = useUpdateProfileVisibilityMutation();
    const [generateAiResume, { isLoading: isGeneratingResume }] = useGenerateAiResumeMutation();

    const resumeRef = useRef<HTMLDivElement>(null);
    const profilePictureInputRef = useRef<HTMLInputElement>(null);
    const documentInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = (ref: React.RefObject<HTMLInputElement>) => ref.current?.click();

    const handleFileUpload = async (file: File | null, uploadMutation: any) => {
        if (!file) return;
        const loadingToast = toast.loading("Uploading file...");
        try {
            await uploadMutation(file).unwrap();
            toast.success(`${file.name} uploaded successfully!`, { id: loadingToast });
        } catch (err) {
            toast.error("File upload failed. Please try again.", { id: loadingToast });
        }
    };

    const handleDownloadResume = () => {
        const input = resumeRef.current;
        if (!input || !profile) {
            toast.error("Could not generate resume.");
            return;
        }
        const loadingToast = toast.loading("Generating your resume...");
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / canvasHeight;
            const width = pdfWidth;
            const height = width / ratio;

            pdf.addImage(imgData, "PNG", 0, 0, width, height > pdfHeight ? pdfHeight : height);
            pdf.save(`${profile.name}-Resume.pdf`);
            toast.success("Resume downloaded!", { id: loadingToast });
        });
    };

    const handleGenerateAndShowAiResume = async () => {
        if (!profile) {
            toast.error("Profile data is not available.");
            return;
        }
        const loadingToast = toast.loading("Our AI is crafting your resume...");
        try {
            const enhancedData = await generateAiResume(profile).unwrap();
            const mergedProfile = { ...profile, ...enhancedData };
            setAiEnhancedProfile(mergedProfile);
            setAiResumeModalOpen(true);
            toast.success("Your AI-enhanced resume is ready!", { id: loadingToast });
        } catch (error) {
            const errorMessage = (error as any)?.data?.error || "Could not generate AI resume. Please try again.";
            toast.error(errorMessage, { id: loadingToast });
        }
    };

    const handleDeleteExperience = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this experience?")) {
            try {
                await deleteExperience(id).unwrap();
                toast.success("Work experience removed.");
            } catch (err) {
                toast.error("Failed to remove experience.");
            }
        }
    };

    const handleDeleteEducation = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this education entry?")) {
            try {
                await deleteEducation(id).unwrap();
                toast.success("Education entry removed.");
            } catch (err) {
                toast.error("Failed to remove education.");
            }
        }
    };

    const handleVisibilityToggle = async (isVisible: boolean) => {
        try {
            await updateVisibility({ isVisible }).unwrap();
            toast.success(`Profile visibility updated.`);
        } catch (error) {
            toast.error("Failed to update visibility.");
        }
    };

    const getInitials = (name: string = "") => name.split(" ").map((n) => n[0]).join("").toUpperCase();

    if (isLoading) {
        return <div className="flex h-screen items-center justify-center"><Loader2 className="h-12 w-12 animate-spin text-primary" /></div>;
    }

    if (isError || !profile) {
        return (
            <div className="flex h-screen items-center justify-center text-red-600">
                <p>Error loading profile. Please try again later.</p>
                <button onClick={() => refetch()} className="ml-4 px-4 py-2 text-primary border border-primary rounded-lg">Retry</button>
            </div>
        );
    }

    return (
        <>
            <div className="absolute -top-full -left-full -z-10"><ResumeTemplate ref={resumeRef} profile={profile} /></div>
            <div className="min-h-screen bg-gray-50">
                <input type="file" ref={profilePictureInputRef} onChange={(e) => handleFileUpload(e.target.files?.[0] || null, uploadProfilePicture)} accept="image/*" className="hidden"/>
                <input type="file" ref={documentInputRef} onChange={(e) => handleFileUpload(e.target.files?.[0] || null, uploadDocument)} className="hidden"/>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                            <div className="relative flex-shrink-0">
                                {profile.profilePicture?.url ? (
                                    <img src={profile.profilePicture.url} alt="Profile" className="w-24 h-24 rounded-full object-cover"/>
                                ) : (
                                    <div className="w-24 h-24 bg-primary text-white rounded-full flex items-center justify-center text-2xl font-bold">{getInitials(profile.name)}</div>
                                )}
                                <button onClick={() => handleFileSelect(profilePictureInputRef)} className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow">
                                    {isUploadingPicture ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4 text-gray-600" />}
                                </button>
                            </div>
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name || "Your Name"}</h1>
                                {profile.location && (<div className="flex items-center text-gray-600 mb-2"><MapPin className="w-4 h-4 mr-1" /><span>{profile.location}</span></div>)}
                                <p className="text-lg text-gray-700">{profile.headline || "Your Professional Headline"}</p>
                            </div>
                            <div className="flex-shrink-0 flex flex-col sm:flex-row gap-2">
                                <button onClick={handleDownloadResume} className="inline-flex items-center justify-center px-4 py-2 border border-primary text-primary text-sm font-medium rounded-md shadow-sm hover:bg-primary/5">
                                    <Download className="w-4 h-4 mr-2" /> Basic Resume
                                </button>
                                <button onClick={handleGenerateAndShowAiResume} disabled={isGeneratingResume} className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium rounded-md shadow-sm hover:opacity-90 disabled:opacity-50">
                                    {isGeneratingResume ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Sparkles className="w-4 h-4 mr-2" />}
                                    AI Enhanced Resume
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2 space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Profile Details</h2>
                                    <button onClick={() => setContactModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-primary text-primary text-sm font-medium rounded-md shadow-sm hover:bg-primary/5">
                                        <Edit className="w-4 h-4 mr-2" /> Edit
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                                    <div><label className="block text-sm font-medium text-gray-500">Email</label><p className="text-gray-900 mt-1">{profile.email}</p></div>
                                    <div><label className="block text-sm font-medium text-gray-500">Phone</label><p className="text-gray-900 mt-1">{profile.phone || "Not provided"}</p></div>
                                    <div><label className="block text-sm font-medium text-gray-500">Current Salary</label><p className="text-gray-900 mt-1">{profile.currentSalary || "Not provided"}</p></div>
                                    <div><label className="block text-sm font-medium text-gray-500">Expected Salary</label><p className="text-gray-900 mt-1">{profile.expectedSalary || "Not provided"}</p></div>
                                    <div className="md:col-span-2"><label className="block text-sm font-medium text-gray-500">Demo Video URL</label>
                                        {profile.demoVideoUrl ? <a href={profile.demoVideoUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all mt-1 block">{profile.demoVideoUrl}</a> : <p className="text-gray-900 mt-1">Not provided</p>}
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Additional Documents</h3>
                                        <p className="text-sm text-gray-500 mt-1">Salary slip, offer letter, etc.</p>
                                        <div className="mt-2 space-y-1">
                                            {profile.documents?.map((doc) => (<a key={doc.public_id} href={doc.url} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline block">{doc.name}</a>))}
                                        </div>
                                    </div>
                                    <button onClick={() => handleFileSelect(documentInputRef)} className="inline-flex items-center px-4 py-2 border border-primary text-primary text-sm font-medium rounded-md shadow-sm hover:bg-primary/5 self-start">
                                        {isUploadingDoc ? <Loader2 className="w-4 h-4 mr-2 inline animate-spin" /> : <Upload className="w-4 h-4 mr-2 inline" />} Upload
                                    </button>
                                </div>
                            </div>
                            
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
                                    <button onClick={() => { setEditingExperience(null); setExperienceModalOpen(true); }} className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md shadow-sm hover:bg-primary/90">
                                        <Plus className="w-4 h-4 mr-2" /> Add Experience
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {profile.workExperience.map((exp) => (
                                        <div key={exp._id} className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                                                    <p className="text-gray-600">{exp.company} • {exp.location}</p>
                                                    <p className="text-sm text-gray-500">{exp.duration}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button onClick={() => { setEditingExperience(exp); setExperienceModalOpen(true); }} className="p-1 text-gray-400 hover:text-gray-600"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDeleteExperience(exp._id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {profile.workExperience.length === 0 && <p className="text-center text-gray-500 py-4">No work experience added yet.</p>}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Education</h2>
                                    <button onClick={() => { setEditingEducation(null); setEducationModalOpen(true); }} className="inline-flex items-center px-4 py-2 bg-primary text-white text-sm font-medium rounded-md shadow-sm hover:bg-primary/90">
                                        <Plus className="w-4 h-4 mr-2" /> Add Education
                                    </button>
                                </div>
                                <div className="space-y-4">
                                    {profile.education.map((edu) => (
                                        <div key={edu._id} className="p-4 border border-gray-200 rounded-lg">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                                                    <p className="text-gray-600">{edu.school}</p>
                                                    <p className="text-sm text-gray-500">{edu.year} • {edu.percentage}</p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <button onClick={() => { setEditingEducation(edu); setEducationModalOpen(true); }} className="p-1 text-gray-400 hover:text-gray-600"><Edit className="w-4 h-4" /></button>
                                                    <button onClick={() => handleDeleteEducation(edu._id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {profile.education.length === 0 && <p className="text-center text-gray-500 py-4">No education history added yet.</p>}
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                <div className="flex items-center justify-between mb-4">
                                    <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
                                    <button onClick={() => setSkillsModalOpen(true)} className="inline-flex items-center px-4 py-2 border border-primary text-primary text-sm font-medium rounded-md shadow-sm hover:bg-primary/5">
                                        <Edit className="w-4 h-4 mr-2" /> Edit
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(profile.skills) && profile.skills.map((skill) => (
                                        <span key={skill._id} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">{skill.name}</span>
                                    ))}
                                    {Array.isArray(profile.skills) && profile.skills.length === 0 && <p className="text-center text-gray-500 py-4 w-full">No skills added yet.</p>}
                                    {!Array.isArray(profile.skills) && <p className="text-gray-500 text-sm">Skills are categorized in the AI-enhanced resume.</p>}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Settings</h3>
                                <div className="mb-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-700">Profile Strength</span>
                                        <span className="text-sm font-medium text-primary">{profile.profileStrength}%</span>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${profile.profileStrength}%` }}></div></div>
                                </div>
                                <div className="mt-6 pt-6 border-t border-gray-200">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <label className="text-sm font-medium text-gray-900">Visible to Schools</label>
                                            <p className="text-xs text-gray-500 mt-1">Allow schools to discover your profile.</p>
                                        </div>
                                        <button onClick={() => handleVisibilityToggle(!profile.isVisible)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${profile.isVisible ? "bg-primary" : "bg-gray-200"}`}>
                                            {isUpdatingVisibility && <Loader2 className="w-4 h-4 animate-spin text-white" />}
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${profile.isVisible ? "translate-x-6" : "translate-x-1"}`}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {isContactModalOpen && <ContactModal isOpen={isContactModalOpen} onClose={() => setContactModalOpen(false)} profile={profile}/>}
            {isExperienceModalOpen && <ExperienceModal isOpen={isExperienceModalOpen} onClose={() => { setExperienceModalOpen(false); setEditingExperience(null); }} experience={editingExperience}/>}
            {isEducationModalOpen && <EducationModal isOpen={isEducationModalOpen} onClose={() => { setEducationModalOpen(false); setEditingEducation(null); }} education={editingEducation}/>}
            {isSkillsModalOpen && Array.isArray(profile.skills) && (
                <SkillsModal 
                    isOpen={isSkillsModalOpen} 
                    onClose={() => setSkillsModalOpen(false)} 
                    currentSkills={profile.skills}
                />
            )}
            {isAiResumeModalOpen && <AIResumePreviewModal isOpen={isAiResumeModalOpen} onClose={() => setAiResumeModalOpen(false)} profile={aiEnhancedProfile} />}
        </>
    );
};

export default MyProfile;
