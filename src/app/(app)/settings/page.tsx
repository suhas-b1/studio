
'use client';

import { Bell, Brush, User as UserIcon } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getUser } from '@/lib/mock-data';
import type { UserRole } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function SettingsPage({ searchParams }: { searchParams: { role: UserRole }}) {
  const role = searchParams.role || 'donor';
  const user = getUser(role);

  return (
    <div className="container mx-auto py-8 px-4 md:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account and application preferences.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
            <Card>
                 <CardHeader className="text-center items-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-primary/50">
                        <AvatarImage src={user.avatarUrl} alt={user.name} />
                        <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <CardTitle className="text-2xl font-headline">{user.organizationName}</CardTitle>
                    <CardDescription>{user.email}</CardDescription>
                </CardHeader>
            </Card>
        </div>

        <div className="md:col-span-2">
            <Card>
                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <UserIcon className="w-6 h-6 text-primary"/>
                        <CardTitle>Profile Information</CardTitle>
                    </div>
                    <CardDescription>Update your personal and organization details.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6">
                        <div className="space-y-2">
                        <Label htmlFor="orgName">Organization Name</Label>
                        <Input id="orgName" defaultValue={user.organizationName} />
                        </div>
                         <div className="space-y-2">
                        <Label htmlFor="contactName">Contact Person</Label>
                        <Input id="contactName" defaultValue={user.name} />
                        </div>
                        <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" defaultValue={user.email} />
                        </div>
                        <div className="flex justify-end">
                            <Button>Save Profile</Button>
                        </div>
                    </form>
                </CardContent>

                <Separator className='my-4'/>
                
                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <Bell className="w-6 h-6 text-primary"/>
                        <CardTitle>Notifications</CardTitle>
                    </div>
                    <CardDescription>Choose how you receive notifications.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-xs text-muted-foreground">Receive emails about new donations and claims.</p>
                        </div>
                        <Switch id="email-notifications" defaultChecked />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-3 shadow-sm">
                        <div className="space-y-0.5">
                            <Label htmlFor="push-notifications">Push Notifications</Label>
                             <p className="text-xs text-muted-foreground">Get real-time alerts on your device.</p>
                        </div>
                        <Switch id="push-notifications" />
                    </div>
                </CardContent>

                <Separator className='my-4'/>

                <CardHeader>
                    <div className='flex items-center gap-3'>
                        <Brush className="w-6 h-6 text-primary"/>
                        <CardTitle>Appearance</CardTitle>
                    </div>
                    <CardDescription>Customize the look and feel of the application.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="theme">Theme</Label>
                        <Select defaultValue="dark">
                            <SelectTrigger id="theme">
                                <SelectValue placeholder="Select theme" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
