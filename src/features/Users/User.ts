export type User = {
    id: string;
    createdAt: string;
    name: string;
    avatar: string;
    email: string;
    groups: Group[];
    access: Access[];
    last_login: number;
}

export type Group = "QA Tester" | "Manager" | "Intern" | "Engineer";

type Access = "nomad" | "django" | "orange-money" | "zebra";