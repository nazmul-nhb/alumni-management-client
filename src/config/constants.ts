export const baseURL = import.meta.env.VITE_API_URL as string;

export const GENDERS = ['Male', 'Female', 'Other', 'Prefer not to say'] as const;

export const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'] as const;

export const DEGREES = ['BA', 'MA'] as const;

export const PARTICIPATION = [
	'Attend alumni events',
	'Volunteer for alumni activities',
	'Mentor current students',
	'Contribute to newsletters/blogs',
	'Donate to the department',
] as const;

export const QUERY_KEYS = ['Alumni', 'Alumnus', 'User', 'Users'] as const;
