import { ColumnDef } from '@tanstack/react-table';
import { User } from './User';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Pencil, UserX, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { timestampToDate } from '@/lib/utils';
import UserCell from './UserCell';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export const columns: ColumnDef<User>[] = [
	{
		header: 'User',
		cell: ({ row }) => {
			return <UserCell user={row.original} />;
		},
	},
	{
		header: 'Teams',
		cell: ({ row }) => {
			const group = row.original.groups[0];
			if (!group) return;

			return (
				<Badge variant="outline">
					<Users className="mr-2 h-4 w-4" /> {group}
				</Badge>
			);
		},
	},
	{
		header: 'Access',
		cell: ({ row }) => {
			const access = row.original.access;
			return (
				<TooltipProvider delayDuration={100}>
					<Tooltip>
						<TooltipTrigger className="border-b-2 border-dashed">
							On {access.length} products
						</TooltipTrigger>
						<TooltipContent className="bg-main text-white">
							<p>{access.join(' & ')}</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			);
		},
	},
	{
		header: 'Last Login',
		cell: ({ row }) => {
			return <span>{timestampToDate(row.original.last_login)}</span>;
		},
	},
	{
		id: 'actions',
		cell: () => {
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<span className="sr-only">Open menu</span>
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem>
							<Pencil className="mr-2 h-4 w-4" /> Edit user
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem className="text-destructive">
							<UserX className="mr-2 h-4 w-4" /> Deactivate user
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
