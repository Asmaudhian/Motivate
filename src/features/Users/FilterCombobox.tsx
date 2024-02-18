import { ChevronDown, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useState } from 'react';
import { Group } from './User';
import { Checkbox } from '@/components/ui/checkbox';
import useUrlParams from '@/lib/useUrlParams';
import { DropdownMenuSeparator } from '@/components/ui/dropdown-menu';

const groups: Group[] = ['QA Tester', 'Manager', 'Intern', 'Engineer'];

export function FilterCombobox() {
	const [open, setOpen] = useState(false);
	const [teams, setTeams] = useUrlParams('teams');

	const teamsArray = teams.split(',');

	function handleValues(value: string) {
		if (!value) return;
		if (teams?.includes(value)) {
			setTeams(teamsArray.filter((team: string) => team !== value).join(','));
		} else {
			if (teams === '') setTeams(value);
			else setTeams([...teamsArray, value].join(','));
		}
	}

	function handleAll() {
		if (teamsArray.length === groups.length) {
			setTeams('');
		} else {
			setTeams(groups.join(',').toLowerCase());
		}
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[200px] justify-between"
				>
					Teams
					<ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
					{teamsArray.length > 0 && teams != '' && (
						<span className="ml-2 flex items-center justify-center rounded border border-secondary bg-secondary/40 px-3 py-1 text-xs font-normal">
							{teamsArray.length} selected
							<X
								className="ml-2 h-3 w-3"
								onClick={(e) => {
									e.stopPropagation();
									setTeams('');
									setOpen(false);
								}}
							/>
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[200px] p-0">
				<Command>
					<CommandInput placeholder="Search teams..." />
					<CommandEmpty>No team found.</CommandEmpty>
					<CommandGroup>
						<CommandItem key={'all'} onSelect={() => handleAll()}>
							<Checkbox
								id={'all'}
								checked={teams.includes(groups.join(',').toLowerCase())}
								className="mr-2"
							/>
							<label>All ({groups.length})</label>
						</CommandItem>
						<DropdownMenuSeparator />
						{groups.map((group) => (
							<CommandItem
								key={group}
								value={group}
								onSelect={(currentValue) => handleValues(currentValue)}
							>
								<Checkbox
									id={group}
									checked={teams.includes(group.toLowerCase())}
									className="mr-2"
								/>
								<label>{group}</label>
							</CommandItem>
						))}
					</CommandGroup>
				</Command>
				<DropdownMenuSeparator />
				<div className="p-2">
					<Button onClick={() => setTeams('')} variant="outline" className="w-full">
						Clear Filters
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	);
}
