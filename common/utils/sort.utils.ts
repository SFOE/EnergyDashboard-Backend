import { DateModel } from '/opt/nodejs/models/base/date.model';

export const dateSortFn = (a: DateModel, b: DateModel) => new Date(a.date).getTime() - new Date(b.date).getTime();
