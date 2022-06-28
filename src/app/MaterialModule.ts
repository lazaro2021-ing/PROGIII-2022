import { NgModule } from "@angular/core";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { MatTableModule } from '@angular/material/table'  





@NgModule({
    exports: [MatToolbarModule, MatCardModule,
        MatButtonModule, MatIconModule,
         MatSidenavModule,
        MatInputModule, MatMenuModule, MatSelectModule,
        MatExpansionModule, MatSidenavModule,
        MatDialogModule,MatRadioModule,MatButtonToggleModule,MatDividerModule,
        MatProgressSpinnerModule,MatSlideToggleModule,MatSliderModule,MatPaginatorModule,MatDatepickerModule,
        MatNativeDateModule,MatTableModule]
})


export class MaterialModule {
}
