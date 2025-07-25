import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Search, Filter, Eye, Ban, CheckCircle, GraduationCap, UserCheck, MoreVertical, Edit, Trash2, BookOpen } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { useGetAllUsersQuery, useUpdateUserStatusMutation, useDeleteUserByAdminMutation } from '@/features/admin/adminApiService';
import toast from 'react-hot-toast';
import UserDetailsModal from './components/UserDetailsModal';
import EditUserModal from './components/EditUserModal';
import StatusBadge from '@/components/ui/StatusBadge';
import { Skeleton } from '@/components/ui/skeleton';

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subjectFilter, setSubjectFilter] = useState('all');
  const [viewingUserId, setViewingUserId] = useState<string | null>(null);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [deletingUserId, setDeletingUserId] = useState<string | null>(null);

  const { data: users = [], isLoading, isError } = useGetAllUsersQuery();
  const [updateUserStatus, { isLoading: isUpdatingStatus }] = useUpdateUserStatusMutation();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserByAdminMutation();

  const uniqueSubjects = useMemo(() => {
    if (!users || users.length === 0) {
      return [];
    }
    const subjects = new Set<string>();
    users.forEach((user: any) => {
      if ((user.role === 'employer' || user.role === 'employee') && user.employerProfile?.headline) {
        subjects.add(user.employerProfile.headline);
      }
    });
    return Array.from(subjects).sort();
  }, [users]);

  const getRoleInfo = (role: string) => {
    switch (role) {
      case 'employer':
      case 'employee': return { icon: <User className="w-4 h-4 text-blue-600" />, name: "Teacher" };
      case 'college': return { icon: <GraduationCap className="w-4 h-4 text-green-600" />, name: "College" };
      case 'admin': return { icon: <UserCheck className="w-4 h-4 text-purple-600" />, name: "Admin" };
      default: return { icon: <User className="w-4 h-4" />, name: role };
    }
  };

  const filteredUsers = useMemo(() => {
    return users.filter((user: any) => {
      const name = user.employerProfile?.name || user.collegeProfile?.name || user.adminProfile?.name || '';
      const isTeacherRole = user.role === 'employer' || user.role === 'employee';
      
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || user.email.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRole = roleFilter === 'all' || (roleFilter === 'employee' && isTeacherRole) || user.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
      const matchesSubject = subjectFilter === 'all' || (isTeacherRole && user.employerProfile?.headline === subjectFilter);
      
      return matchesSearch && matchesRole && matchesStatus && matchesSubject;
    });
  }, [users, searchTerm, roleFilter, statusFilter, subjectFilter]);

  const stats = useMemo(() => ({
    total: users.length,
    employee: users.filter((u: any) => u.role === 'employer' || u.role === 'employee').length,
    college: users.filter((u: any) => u.role === 'college').length,
    admin: users.filter((u: any) => u.role === 'admin').length,
    active: users.filter((u: any) => u.status === 'active').length,
    pending: users.filter((u: any) => u.status === 'pending').length,
    suspended: users.filter((u: any) => u.status === 'suspended').length,
  }), [users]);

  const handleUpdateStatus = async (userId: string, status: string) => {
    try {
      await updateUserStatus({ userId, status }).unwrap();
      toast.success(`User status updated to ${status}.`);
    } catch { toast.error('Failed to update user status.'); }
  };

  const handleDelete = async () => {
    if (!deletingUserId) return;
    try {
        await deleteUser(deletingUserId).unwrap();
        toast.success('User has been deleted.');
        setDeletingUserId(null);
    } catch { toast.error('Failed to delete user.'); }
  }
  
  const renderSkeleton = () => (
    <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/5" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
                <Skeleton className="h-10 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
    </div>
  );

  if (isLoading) return (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>User Management</CardTitle><CardDescription>Manage all platform users across different roles.</CardDescription></CardHeader></Card>
      {renderSkeleton()}
    </div>
  );
  if (isError) return <div className="text-center py-10 text-red-500">Error loading users. Please try again later.</div>;

  return (
    <div className="space-y-6">
      <Card><CardHeader><CardTitle>User Management</CardTitle><CardDescription>Manage all platform users across different roles. You can view, edit, change status, or delete users.</CardDescription></CardHeader></Card>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold">{stats.total}</div><div className="text-sm text-muted-foreground">Total</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-blue-600">{stats.employee}</div><div className="text-sm text-muted-foreground">Teachers</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{stats.college}</div><div className="text-sm text-muted-foreground">Institution</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-purple-600">{stats.admin}</div><div className="text-sm text-muted-foreground">Admins</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-green-600">{stats.active}</div><div className="text-sm text-muted-foreground">Active</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-yellow-600">{stats.pending}</div><div className="text-sm text-muted-foreground">Pending</div></CardContent></Card>
        <Card><CardContent className="p-4 text-center"><div className="text-2xl font-bold text-red-600">{stats.suspended}</div><div className="text-sm text-muted-foreground">Suspended</div></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row items-center gap-4">
            <div className="relative w-full lg:flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search by name or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
            </div>
            <div className="flex w-full flex-col sm:flex-row gap-4 lg:w-auto">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]"><Filter className="w-4 h-4 mr-2" /><SelectValue placeholder="Filter by role" /></SelectTrigger>
                    <SelectContent><SelectItem value="all">All Roles</SelectItem><SelectItem value="employee">Teachers</SelectItem><SelectItem value="college">Institution</SelectItem><SelectItem value="admin">Admins</SelectItem></SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]"><SelectValue placeholder="Filter by status" /></SelectTrigger>
                    <SelectContent><SelectItem value="all">All Status</SelectItem><SelectItem value="active">Active</SelectItem><SelectItem value="pending">Pending</SelectItem><SelectItem value="suspended">Suspended</SelectItem></SelectContent>
                </Select>
                {(roleFilter === 'all' || roleFilter === 'employee') && (
                    <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]"><BookOpen className="w-4 h-4 mr-2" /><SelectValue placeholder="Filter by subject" /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Subjects</SelectItem>
                            {uniqueSubjects.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                        </SelectContent>
                    </Select>
                )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredUsers.map((user: any) => {
          const name = user.employerProfile?.name || user.collegeProfile?.name || user.adminProfile?.name || user.email;
          const roleInfo = getRoleInfo(user.role);
          const initials = name?.split(' ').map((n: string) => n[0]).join('').toUpperCase() || 'U';
          return (
            <Card key={user._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Avatar className="w-12 h-12 flex-shrink-0"><AvatarImage src={user.profilePicture} /><AvatarFallback>{initials}</AvatarFallback></Avatar>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold truncate" title={name}>{name}</h3>
                      <p className="text-sm text-muted-foreground truncate" title={user.email}>{user.email}</p>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5">
                        <div className="flex items-center gap-1.5">{roleInfo.icon}<span className="text-sm">{roleInfo.name === 'College' ? "Institution": roleInfo.name}</span></div>
                        <StatusBadge status={user.status}><span className="capitalize">{user.status}</span></StatusBadge>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 flex items-center gap-2 w-full sm:w-auto">
                    {user.status === 'pending' && <Button size="sm" className="flex-1 sm:flex-none" onClick={() => handleUpdateStatus(user._id, 'active')} disabled={isUpdatingStatus}><CheckCircle className="w-4 h-4 mr-2" />Approve</Button>}
                    {user.status === 'active' && <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => handleUpdateStatus(user._id, 'suspended')} disabled={isUpdatingStatus}><Ban className="w-4 h-4 mr-2" />Suspend</Button>}
                    {user.status === 'suspended' && <Button size="sm" className="flex-1 sm:flex-none" onClick={() => handleUpdateStatus(user._id, 'active')} disabled={isUpdatingStatus}><CheckCircle className="w-4 h-4 mr-2" />Reactivate</Button>}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild><Button variant="ghost" size="icon"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onSelect={() => setViewingUserId(user._id)}><Eye className="mr-2 h-4 w-4" />View Details</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setEditingUserId(user._id)} disabled={user.role === 'admin'}><Edit className="mr-2 h-4 w-4" />Edit Profile</DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => setDeletingUserId(user._id)} disabled={user.role === 'admin'} className="text-red-600 focus:text-red-600"><Trash2 className="mr-2 h-4 w-4" />Delete User</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
      
      {filteredUsers.length === 0 && !isLoading && (
        <Card>
            <CardContent className="p-12 text-center">
                <div className="w-12 h-12 text-muted-foreground mx-auto mb-4"><Search /></div>
                <h3 className="text-lg font-medium mb-2">No Users Found</h3>
                <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
            </CardContent>
        </Card>
      )}
      
      {viewingUserId && <UserDetailsModal userId={viewingUserId} onClose={() => setViewingUserId(null)} />}
      {editingUserId && <EditUserModal userId={editingUserId} onClose={() => setEditingUserId(null)} />}
      
      <AlertDialog open={deletingUserId !== null} onOpenChange={() => setDeletingUserId(null)}>
        <AlertDialogContent>
            <AlertDialogHeader><AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle><AlertDialogDescription>This will permanently delete the user and all of their associated data (profiles, jobs, applications, etc.). This action cannot be undone.</AlertDialogDescription></AlertDialogHeader>
            <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDelete} disabled={isDeleting} className="bg-destructive hover:bg-destructive/90">Delete User</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Users;
