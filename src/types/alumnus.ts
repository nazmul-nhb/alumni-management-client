import type { BLOOD_GROUPS, DEGREES, GENDERS, PARTICIPATION } from '@/config/constants';
import type { Email } from '@/types';
import type { ItemFromDB } from '@/types/interface';

export type TBloodGroup = (typeof BLOOD_GROUPS)[number];
export type TGender = (typeof GENDERS)[number];
export type TDegree = (typeof DEGREES)[number];
export type TParticipation = (typeof PARTICIPATION)[number];

export interface IAlumnus {
	personal_info: IPersonalInfo;
	contact_info: IContactInfo;
	academic_info: IAcademicInfo;
	employment_info?: IEmploymentInfo;
	participation: TParticipation;
	interest: string;
}

export interface IPersonalInfo {
	full_name: string;
	date_of_birth: string;
	gender: TGender;
	image: string;
	nationality: string;
	blood_group: TBloodGroup;
}

export interface IContactInfo {
	email: Email;
	phone: `${number}`;
	current_address?: string;
}

export interface IAcademicInfo {
	student_id?: `${number}`;
	degree_earned: TDegree;
	graduation_year: number;
	focus_area?: string;
}

export interface IEmploymentInfo {
	current_employer: string;
	job_title: string;
	sector: string;
	work_location: string;
}

export interface IAlumnusInfo extends ItemFromDB {}
