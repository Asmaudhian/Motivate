import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DataTable } from '@/components/DataTable';
import { useQuery } from '@tanstack/react-query';
import { httpGet } from '@/lib/utils';
import { User } from './User';
import { columns } from './UserColumns';
import { useSearchParams } from 'react-router-dom';

function Users() {
	const { isPending, error, data } = useQuery<User[]>({
		queryKey: ['users'],
		queryFn: () => httpGet('/users/users'),
	});

	const [searchParams, setSearchParams] = useSearchParams({ search: '' });

	const users = data
		? data.filter((user) =>
				user.name.toLowerCase().includes(searchParams.get('search')?.toLowerCase() || '')
			)
		: [];

	return (
		<>
			<div className="mb-4 flex w-full justify-between">
				<h1 className="align-middle text-3xl font-bold">Users ({users?.length})</h1>
				<div className="flex gap-2">
					<Button variant="outline">Export List</Button>
					<Button variant="secondary">New user</Button>
				</div>
			</div>
			<div className="mb-4 flex gap-2">
				<Input
					className="w-1/3"
					defaultValue={searchParams.get('search') || ''}
					placeholder="Search..."
					onChange={(e) => setSearchParams({ search: e.target.value })}
				/>
				<Button variant="outline">Teams</Button>
			</div>
			{isPending && <div>Loading...</div>}
			{error && <div>Error: {error.message}</div>}
			{data && <DataTable columns={columns} data={users} />}
		</>
	);
}

export default Users;
