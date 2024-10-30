import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  effect,
  inject,
  model,
  ViewChild,
} from '@angular/core';
import { Group, Member } from '../../types';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
  MatPaginator,
  MatPaginatorIntl,
  MatPaginatorModule,
} from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { pageSizes } from '../../constants';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MembersService } from '../../services';
import { getUaPaginatorIntl } from '../../intls/ua-paginator.intl';

@Component({
  selector: 'app-group-details',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [{ provide: MatPaginatorIntl, useValue: getUaPaginatorIntl() }],
  templateUrl: './group-details.component.html',
  styleUrl: './group-details.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupDetailsComponent implements AfterViewInit {
  group = model<Group>();

  private readonly membersService = inject(MembersService);
  private readonly _liveAnnouncer = inject(LiveAnnouncer);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  readonly filterQuery = model('');
  readonly members = this.membersService.members;

  dataSource = new MatTableDataSource<Member>();
  pageSizes = pageSizes;
  displayedColumns: string[] = [
    'position',
    'name',
    'number',
    'date',
    'additionalInfo',
  ];

  constructor() {
    effect(
      () => {
        this.group()?.id &&
          this.membersService.getMembersByGroupId(this.group().id);
      },
      { allowSignalWrites: true }
    );

    effect(() => {
      this.dataSource.data = this.addPosition(this.members());
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });

    effect(() => {
      this.dataSource.filter = this.filterQuery().toLowerCase().trim();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  onClose(): void {
    this.group.set(null);
  }

  resetFilterQuery(): void {
    this.filterQuery.set('');
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  private addPosition(members: Member[]) {
    if (!members) return [];

    return members.map((member: Member, index: number) => ({
      ...member,
      position: index + 1,
    }));
  }
}
