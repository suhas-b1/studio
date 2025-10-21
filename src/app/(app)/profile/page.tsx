
'use client';
import { use } from 'react';
import { Award } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/mock-data';
import type { UserRole } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage({ searchParams }: { searchParams: { role?: UserRole }}) {
  const role = use(Promise.resolve(searchParams.role)) || 'donor';
  const user = getUser(role);

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="text-center">
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-primary/50">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-3xl font-headline">{user.organizationName}</CardTitle>
          <CardDescription className="flex items-center justify-center gap-2">
            {user.isVerified ? (
              <>
                <Award className="w-4 h-4 text-accent" />
                Verified {user.role === 'donor' ? 'Donor' : 'Recipient'}
              </>
            ) : (
              'Not Verified'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="orgName">Organization Name</Label>
              <Input id="orgName" defaultValue={user.organizationName} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contactName">Contact Person Name</Label>
              <Input id="contactName" defaultValue={user.name.split("'")[0]} />
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
