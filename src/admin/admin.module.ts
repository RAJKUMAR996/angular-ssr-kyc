import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { routes } from './admin.route';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbHighlight } from '@ng-bootstrap/ng-bootstrap';
import { AdminComponent } from './admin.component';
import { UserEditComponent } from './components/user-edit/user-edit.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        UserEditComponent,
        NgbHighlight],
    exports: [],
    declarations: [AdminComponent],
    providers: [],
})
export class AdminModule { }
