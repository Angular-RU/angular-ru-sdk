import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatDivider} from '@angular/material/divider';
import {MatList, MatListItem} from '@angular/material/list';
import {MatDrawer, MatDrawerContainer, MatDrawerContent} from '@angular/material/sidenav';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
    selector: 'app-root',
    imports: [
        MatDivider,
        MatDrawer,
        MatDrawerContainer,
        MatDrawerContent,
        MatList,
        MatListItem,
        MatToolbar,
        RouterLink,
        RouterOutlet,
    ],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {}
