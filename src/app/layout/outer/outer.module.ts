import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { routes } from './outer-routes.const';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { OuterComponent } from './outer.component';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    exports: [],
    declarations: [OuterComponent,HeaderComponent, FooterComponent],
    providers: [],
})
export class OuterModule { }
