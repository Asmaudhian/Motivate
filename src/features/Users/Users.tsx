import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/DataTable';
import { useQuery } from '@tanstack/react-query';
import { httpGet } from '@/lib/utils';
import { User } from './User';
import { columns } from './UserColumns';
import { FilterCombobox } from './FilterCombobox';
import useUrlParams from '@/lib/useUrlParams';
import { FileUp, Plus } from 'lucide-react';

function Users() {
	const { isPending, error, data } = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => httpGet('/users/users'),
	});

	const [search, setSearch] = useUrlParams('search');
	const [teams] = useUrlParams('teams');

	const teamsArray = teams ? teams.split(',') : [];

	const users = data
		? data.filter(
				(user) =>
					user.name.toLowerCase().includes(search.toLowerCase()) &&
					(user.groups.some((group) => teamsArray.includes(group.toLowerCase())) ||
						!teamsArray.length)
			)
		: [];

	return (
		<>
			<div className="mb-4 flex w-full justify-between">
				<h1 className="align-middle text-3xl font-bold">Users ({users?.length})</h1>
				<div className="flex gap-2">
					<Button variant="outline">
						<FileUp className="mr-2 h-4 w-4" /> Export List
					</Button>
					<Button variant="secondary">
						<Plus className="mr-2 h-4 w-4" /> New user
					</Button>
				</div>
			</div>
			<div className="mb-4 flex gap-2">
				<Input
					className="w-1/3"
					defaultValue={search}
					placeholder="Search..."
					onChange={(e) => setSearch(e.target.value)}
				/>
				<FilterCombobox />
			</div>
			<div className="mb-6">
				{isPending && <div>Loading...</div>}
				{error && <div>Error: {error.message}</div>}
				{data && <DataTable columns={columns} data={users} />}
			</div>
		</>
	);
}

export default Users;
