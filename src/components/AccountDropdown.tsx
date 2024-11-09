'use client'
import { Avatar, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { UserType } from '@/schemas/userSchema'

import {
  LayoutDashboard,
  LogOut,
  Settings,
  User as UserIcon
} from 'lucide-react'
import Link from 'next/link'

export function AccountDropdown({
  user,
  signOut
}: {
  user: UserType | null
  signOut: () => void
}) {
  return (
    <DropdownMenu modal={false}>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-8 h-8 cursor-pointer">
                <AvatarImage
                  //   className="w-8 h-8"
                  src={
                    user?.picture ?? 'https://avatar.vercel.sh/' + user?.email
                  }
                  alt={user?.email}
                />
              </Avatar>
            </DropdownMenuTrigger>
          </TooltipTrigger>
        </Tooltip>
      </TooltipProvider>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <span className="text-sm">My Account</span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href={'/admin'} className="cursor-pointer">
            <LayoutDashboard className=" mr-2 h-4 w-4 text-muted-foreground " />
            <span> Admin</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/user'} className="cursor-pointer">
            <UserIcon className=" mr-2 h-4 w-4 text-muted-foreground" />
            <span> View Perfile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={'/settings'} className="cursor-pointer">
            <Settings className=" mr-2 h-4 w-4 text-muted-foreground" />
            <span> Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
