import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IEmployee } from 'app/shared/model/employee.model';

type EntityResponseType = HttpResponse<IEmployee>;
type EntityArrayResponseType = HttpResponse<IEmployee[]>;

@Injectable({ providedIn: 'root' })
export class EmployeeService {
    private resourceUrl = SERVER_API_URL + 'api/employees';

    constructor(private http: HttpClient) {}

    create(employee: IEmployee): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(employee);
        return this.http
            .post<IEmployee>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(employee: IEmployee): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(employee);
        return this.http
            .put<IEmployee>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IEmployee>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IEmployee[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(employee: IEmployee): IEmployee {
        const copy: IEmployee = Object.assign({}, employee, {
            hireDate: employee.hireDate != null && employee.hireDate.isValid() ? employee.hireDate.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.hireDate = res.body.hireDate != null ? moment(res.body.hireDate) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((employee: IEmployee) => {
            employee.hireDate = employee.hireDate != null ? moment(employee.hireDate) : null;
        });
        return res;
    }
}
