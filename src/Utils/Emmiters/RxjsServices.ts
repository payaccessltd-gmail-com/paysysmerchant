import { ReplaySubject } from "rxjs";

const emmitBooleanData$: ReplaySubject<any> = new ReplaySubject<any>();

export const setShowPopUp = (data: boolean) => {
    emmitBooleanData$.next(data);
}

export const getShowPopUp = emmitBooleanData$.asObservable();