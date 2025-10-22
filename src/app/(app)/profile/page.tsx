
'use client';
import { Award, Camera } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';
import { useState, useRef } from 'react';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      // Here you would also handle uploading the file to Firebase Storage
      // and updating the user's photoURL in their Firebase profile.
    }
  };

  if (isUserLoading || !user) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-8">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center items-center">
            <Skeleton className="w-24 h-24 rounded-full mb-4" />
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-32" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentPhoto = photoPreview || user.photoURL || '';

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-4 group">
            <Avatar className="w-24 h-24 border-4 border-primary/50">
              <AvatarImage src={currentPhoto} alt={user.displayName || 'User'} />
              <AvatarFallback className="text-4xl">{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
            >
              <Camera className="w-8 h-8 text-white" />
            </button>
            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden"
                accept="image/*"
                onChange={handlePhotoChange}
            />
          </div>
          <CardTitle className="text-3xl font-headline">{user.displayName}</CardTitle>
          {/* This is a placeholder for verification status. In a real app this would come from your database */}
          <CardDescription className="flex items-center justify-center gap-2">
            <Award className="w-4 h-4 text-accent" />
            Verified Member
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input id="orgName" defaultValue={user.displayName || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email || ''} readOnly />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Person Name</Label>
              <Input id="contactName" defaultValue={user.displayName || ''} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="password">New Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
            <div className="flex justify-end">
              <Button>Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
