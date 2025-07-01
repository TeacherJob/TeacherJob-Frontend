import React, { useState, useEffect } from 'react';
import { useGetAllCarouselSlidesQuery, useCreateCarouselSlideMutation, useUpdateCarouselSlideMutation, useDeleteCarouselSlideMutation } from '@/features/admin/carouselApiService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Skeleton } from '@/components/ui/skeleton';
import { Edit, Trash2, UploadCloud, Video, Image } from 'lucide-react';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Badge } from "@/components/ui/badge";

const SlideForm = ({ slide, onClose, createSlide, updateSlide, isLoading }) => {
    const [formData, setFormData] = useState({
        title: '', subtitle: '', description: '',
        primaryButtonText: '', primaryButtonLink: '',
        secondaryButtonText: '', secondaryButtonLink: '',
        backgroundType: 'image', gradient: 'from-indigo-700 to-purple-800', status: 'draft'
    });
    const [mediaFile, setMediaFile] = useState<File | null>(null);

    useEffect(() => {
        if (slide) {
            setFormData({
                title: slide.title || '', subtitle: slide.subtitle || '', description: slide.description || '',
                primaryButtonText: slide.primaryButtonText || '', primaryButtonLink: slide.primaryButtonLink || '',
                secondaryButtonText: slide.secondaryButtonText || '', secondaryButtonLink: slide.secondaryButtonLink || '',
                backgroundType: slide.backgroundType || 'image', gradient: slide.gradient || '', status: slide.status || 'draft'
            });
        }
    }, [slide]);

    const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
    const handleSelectChange = (id, value) => setFormData(prev => ({ ...prev, [id]: value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
        if (mediaFile) {
            data.append('backgroundMedia', mediaFile);
        }

        try {
            if (slide) {
                await updateSlide({ id: slide._id, data }).unwrap();
                toast.success("Slide updated successfully!");
            } else {
                await createSlide(data).unwrap();
                toast.success("Slide created successfully!");
            }
            onClose();
        } catch (err) {
            toast.error("An error occurred.");
        }
    };
    
    return (
        <Dialog open={true} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl">
                <DialogHeader><DialogTitle>{slide ? 'Edit Slide' : 'Create New Slide'}</DialogTitle></DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto pr-4 pt-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label htmlFor="title">Title</Label><Input id="title" value={formData.title} onChange={handleChange} required/></div>
                        <div><Label htmlFor="subtitle">Subtitle</Label><Input id="subtitle" value={formData.subtitle} onChange={handleChange} required/></div>
                    </div>
                    <div><Label htmlFor="description">Description</Label><Textarea id="description" value={formData.description} onChange={handleChange} required/></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label htmlFor="primaryButtonText">Primary Button Text</Label><Input id="primaryButtonText" value={formData.primaryButtonText} onChange={handleChange} required/></div>
                        <div><Label htmlFor="primaryButtonLink">Primary Button Link</Label><Input id="primaryButtonLink" value={formData.primaryButtonLink} onChange={handleChange} required/></div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div><Label htmlFor="secondaryButtonText">Secondary Button Text</Label><Input id="secondaryButtonText" value={formData.secondaryButtonText} onChange={handleChange} required/></div>
                        <div><Label htmlFor="secondaryButtonLink">Secondary Button Link</Label><Input id="secondaryButtonLink" value={formData.secondaryButtonLink} onChange={handleChange} required/></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Background Type</Label>
                            <Select value={formData.backgroundType} onValueChange={(v) => handleSelectChange('backgroundType', v)}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent><SelectItem value="image">Image</SelectItem><SelectItem value="video">Video</SelectItem></SelectContent>
                            </Select>
                        </div>
                         <div>
                            <Label>Background Media</Label>
                            <Input id="backgroundMedia" type="file" onChange={(e) => setMediaFile(e.target.files ? e.target.files[0] : null)} required={!slide}/>
                            {slide && <p className="text-xs text-muted-foreground mt-1">Leave blank to keep existing media.</p>}
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label>Gradient Overlay</Label>
                            <Select value={formData.gradient} onValueChange={(v) => handleSelectChange('gradient', v)}>
                                <SelectTrigger><SelectValue/></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="from-indigo-700 to-purple-800">Indigo/Purple</SelectItem>
                                    <SelectItem value="from-slate-700 to-gray-800">Gray</SelectItem>
                                    <SelectItem value="from-blue-700 to-indigo-800">Blue/Indigo</SelectItem>
                                    <SelectItem value="from-purple-700 to-pink-800">Purple/Pink</SelectItem>
                                    <SelectItem value="from-green-700 to-teal-800">Green/Teal</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div>
                            <Label>Status</Label>
                             <div className="flex items-center space-x-2 pt-2">
                                <Switch id="status" checked={formData.status === 'published'} onCheckedChange={(c) => handleSelectChange('status', c ? 'published' : 'draft')} />
                                <Label htmlFor="status">{formData.status === 'published' ? 'Published' : 'Draft'}</Label>
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="pt-4">
                        <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                        <Button type="submit" disabled={isLoading}>{isLoading ? 'Saving...' : 'Save Slide'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const ManageCarousel = () => {
    const { data: slidesResponse, isLoading: isLoadingSlides } = useGetAllCarouselSlidesQuery();
    const slides = slidesResponse?.data || [];
    const [createSlide, { isLoading: isCreating }] = useCreateCarouselSlideMutation();
    const [updateSlide, { isLoading: isUpdating }] = useUpdateCarouselSlideMutation();
    const [deleteSlide] = useDeleteCarouselSlideMutation();
    
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);

    const handleEdit = (slide) => {
        setEditingSlide(slide);
        setIsFormOpen(true);
    };

    const handleDelete = async (id) => {
        try {
            await deleteSlide(id).unwrap();
            toast.success("Slide deleted successfully.");
        } catch (err) {
            toast.error("Failed to delete slide.");
        }
    };

    const handleFormClose = () => {
        setIsFormOpen(false);
        setEditingSlide(null);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Manage Homepage Carousel</h1>
                    <p className="text-muted-foreground">Add, edit, or remove slides from the main carousel.</p>
                </div>
                <Button onClick={() => { setEditingSlide(null); setIsFormOpen(true); }}>Add New Slide</Button>
            </div>
            
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Slide</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isLoadingSlides ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <TableRow key={i}>
                                    <TableCell><Skeleton className="h-10 w-full" /></TableCell>
                                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                                    <TableCell className="text-right"><Skeleton className="h-8 w-20" /></TableCell>
                                </TableRow>
                            ))
                        ) : slides.map(slide => (
                            <TableRow key={slide._id}>
                                <TableCell>
                                    <div className="flex items-center gap-4">
                                        {slide.backgroundType === 'video' ? <Video className="w-8 h-8 text-muted-foreground"/> : <Image className="w-8 h-8 text-muted-foreground"/>}
                                        <span className="font-medium">{slide.title}</span>
                                    </div>
                                </TableCell>
                                <TableCell><Badge variant={slide.status === 'published' ? 'default' : 'secondary'}>{slide.status}</Badge></TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon" onClick={() => handleEdit(slide)}><Edit className="w-4 h-4"/></Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild><Button variant="ghost" size="icon" className="text-destructive"><Trash2 className="w-4 h-4"/></Button></AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone and will permanently delete this slide.</AlertDialogDescription></AlertDialogHeader>
                                            <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(slide._id)}>Delete</AlertDialogAction></AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {isFormOpen && <SlideForm slide={editingSlide} onClose={handleFormClose} createSlide={createSlide} updateSlide={updateSlide} isLoading={isCreating || isUpdating} />}
        </div>
    );
};

export default ManageCarousel;