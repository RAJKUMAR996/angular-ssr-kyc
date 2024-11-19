import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MedicalRep } from './models/user.model';

const USERS: MedicalRep[] = [
	{
		firstName: 'Russia',
		userId:'1',
		position:'doctor',
		email:'testuser@gov.in',
		isActive:true
	} as MedicalRep,
	{
		firstName: 'China',
		userId:'4',
		position:'doctor',
		email:'testuser@gov.in',
		isActive:true
	} as MedicalRep,
];

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrl: './admin.component.scss',
})
export class AdminComponent {
	users$: Observable<MedicalRep[]>;
	filter = new FormControl('', { nonNullable: true });

	constructor() {
		this.users$ = this.filter.valueChanges.pipe(
			startWith(''),
			map((text) => this.search(text)),
		);
	}

	private search(text: string): MedicalRep[] {
		return USERS.filter((user) => {
			const term = text.toLowerCase();
			return (
				user.firstName.toLowerCase().includes(term) ||
				user.email?.includes(term) ||
				user.position?.toString().includes(term)
			);
		});
	}
}
