import {
	Button,
	Card,
	CardBody,
	DatePicker,
	Form,
	Image,
	Input,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
	Textarea,
} from '@heroui/react';
import { I18nProvider } from '@react-aria/i18n';
import { BLOOD_GROUPS, DEGREES, GENDERS, PARTICIPATION } from '@/config/constants';
import { useMutationQuery } from '@/hooks/useMutationQuery';
import { createHeroOptions } from '@/lib/helpers';
import type {
	IAlumnus,
	IAlumnusInfo,
	TBloodGroup,
	TDegree,
	TGender,
	TParticipation,
} from '@/types/alumnus';
import { useState, type FormEvent } from 'react';
const genders = createHeroOptions(GENDERS);
const bloodGroups = createHeroOptions(BLOOD_GROUPS);
const degrees = createHeroOptions(DEGREES);

const gradYears = () => {
	const MIN = 2002;

	const MAX = new Date().getFullYear();

	const years: { key: number; label: string }[] = [];

	for (let i = MIN; i <= MAX; i++) {
		years.push({ key: i, label: `${i}` });
	}

	return years;
};

export default function AlumnusForm() {
	const [previewUrl, setPreviewUrl] = useState('');

	const { mutate, isPending } = useMutationQuery<IAlumnus, IAlumnusInfo>({
		endpoint: '/alumni',
		method: 'post',
		queryKey: ['Alumnus'],
	});

	const validateGoogleDriveLink = (url: string): boolean => {
		const driveRegex =
			/^https:\/\/drive\.google\.com\/(file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/;
		return driveRegex.test(url);
	};

	function handleSubmitAlumnus(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const data = Object.fromEntries(new FormData(e.currentTarget));
		// Map form fields into IAlumnus
		const alumnus: IAlumnus = {
			personal_info: {
				full_name: data.full_name as string,
				date_of_birth: data.date_of_birth as string,
				gender: data.gender as TGender,
				image: data.image as string,
				nationality: data.nationality as string,
				blood_group: data.blood_group as TBloodGroup,
			},
			contact_info: {
				email: data.email as any,
				phone: data.phone as `${number}`,
				current_address: (data.current_address as string) || '',
			},
			academic_info: {
				student_id: (data.student_id as `${number}`) || undefined,
				degree_earned: data.degree_earned as TDegree,
				graduation_year: Number(data.graduation_year),
				focus_area: (data.focus_area as string) || '',
			},
			employment_info: {
				current_employer: (data.current_employer as string) || '',
				job_title: (data.job_title as string) || '',
				sector: (data.sector as string) || '',
				work_location: (data.work_location as string) || '',
			},
			participation: data.participation as TParticipation,
			interest: (data.interest as string) || '',
		};

		mutate(alumnus);
	}

	return (
		<Card className="max-w-3xl mx-auto my-10 shadow-2xl rounded-2xl">
			<CardBody className="p-8 space-y-6">
				<h1 className="text-3xl font-bold text-center">Alumni Registration Form</h1>

				<Form
					validationBehavior="native"
					className="space-y-8"
					onSubmit={handleSubmitAlumnus}
				>
					{/* Personal Info */}
					<div className="w-full grid md:grid-cols-2 gap-4">
						<Input
							name="full_name"
							label="Full Name"
							isRequired
							validate={(val) =>
								val.trim().length > 0 ? null : 'Full name is required.'
							}
						/>
						<div className="flex w-full flex-wrap md:flex-nowrap gap-4">
							<I18nProvider locale="en-GB">
								<DatePicker
									name="date_of_birth"
									label="Date of Birth"
									isRequired
									showMonthAndYearPickers
									validate={(val) =>
										val ? null : 'Date of birth is required.'
									}
								/>
							</I18nProvider>
						</div>
						<Select
							name="gender"
							label="Gender"
							isRequired
							items={genders}
							validate={(val) => (val ? null : 'Please select a gender.')}
						>
							{(gender) => <SelectItem>{gender.label}</SelectItem>}
						</Select>
						<Input
							name="nationality"
							label="Nationality"
							isRequired
							validate={(val) =>
								val.trim().length > 0 ? null : 'Nationality is required.'
							}
						/>
						<Select
							name="blood_group"
							label="Blood Group"
							isRequired
							items={bloodGroups}
							validate={(val) => (val ? null : 'Please select a blood group.')}
						>
							{(group) => <SelectItem>{group.label}</SelectItem>}
						</Select>
						<Input
							name="image"
							label="Profile Image (Google Drive Link)"
							onChange={(e) => {
								const val = e.target.value;
								if (!val) return setPreviewUrl('');
								const fileId = val.match(/[-\w]{25,}/)?.[0];
								if (fileId) {
									setPreviewUrl(
										`https://drive.google.com/uc?export=view&id=${fileId}`
									);
								} else {
									setPreviewUrl('');
								}
							}}
							validate={(val) => {
								if (!val) return null; // optional
								if (!validateGoogleDriveLink(val)) {
									return 'Invalid Google Drive link.';
								}
								return null;
							}}
						/>
						{previewUrl && (
							<div className="col-span-2 flex justify-center">
								<Image
									src={previewUrl}
									alt="Preview"
									width={150}
									className="rounded-xl shadow"
								/>
							</div>
						)}
					</div>

					{/* Contact Info */}
					<div className="w-full grid md:grid-cols-2 gap-4">
						<Input
							type="email"
							name="email"
							label="Email"
							isRequired
							validate={(val) =>
								/\S+@\S+\.\S+/.test(val) ? null : 'Please enter a valid email.'
							}
						/>
						<Input
							type="tel"
							name="phone"
							label="Phone"
							isRequired
							validate={(val) =>
								/^\d{6,15}$/.test(val) ? null : (
									'Please enter a valid phone number.'
								)
							}
						/>
						<Textarea name="current_address" label="Current Address" />
					</div>

					{/* Academic Info */}
					<div className="w-full grid md:grid-cols-2 gap-4">
						<Input name="student_id" label="Student ID" />
						<Select
							name="degree_earned"
							label="Degree Earned"
							isRequired
							items={degrees}
							validate={(val) => (val ? null : 'Please select a degree.')}
						>
							{(degree) => <SelectItem>{degree.label}</SelectItem>}
						</Select>

						<Select
							name="graduation_year"
							label="Graduation Year"
							isRequired
							items={gradYears()}
							validate={(val) => (val ? null : 'Please select a degree.')}
						>
							{(year) => <SelectItem>{year.label}</SelectItem>}
						</Select>

						<Input name="focus_area" label="Focus Area" />
					</div>

					{/* Employment Info */}
					<div className="w-full grid md:grid-cols-2 gap-4">
						<Input name="current_employer" label="Current Employer" />
						<Input name="job_title" label="Job Title" />
						<Input name="sector" label="Sector" />
						<Input name="work_location" label="Work Location" />
					</div>

					{/* Participation */}
					<RadioGroup
						name="participation"
						label="How would you like to participate?"
						isRequired
						validate={(val) => (val ? null : 'Please select at least one option.')}
					>
						{PARTICIPATION.map((part) => (
							<Radio key={part} value={part}>
								{part}
							</Radio>
						))}
					</RadioGroup>

					{/* Interest */}
					<Textarea name="interest" label="Your Interests" />

					<div className="flex justify-center">
						<Button
							isLoading={isPending}
							type="submit"
							color="primary"
							className="w-full md:w-1/2"
						>
							Submit
						</Button>
					</div>
				</Form>
			</CardBody>
		</Card>
	);
}
