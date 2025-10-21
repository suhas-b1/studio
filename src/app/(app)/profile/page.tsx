
'use client';
import { Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUser } from '@/firebase';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();

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

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/50">
            <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
            <AvatarFallback className="text-4xl">{user.displayName?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
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
