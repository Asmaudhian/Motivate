import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User } from './User';

function UserCell({ user }: { user: User }) {
	return (
		<div className="flex gap-4">
			<Avatar>
				<AvatarFallback>{user.name[0]}</AvatarFallback>
			</Avatar>
			<div>
				<h3 className="text-sm font-bold">{user.name}</h3>
				<p className="text-gray-400">{user.email}</p>
			</div>
		</div>
	);
}

export default UserCell;
