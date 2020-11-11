import { isDate } from 'date-fns';
import { ru } from 'date-fns/locale';

const DAYS_OF_WEEK = [...Array(7).keys()].map(i =>
  ru.localize.day(i, { width: 'short' })
);

const addZero = value => {
  return String(value).padStart(2, '0');
};

const isTimeValueValid = value => {
  let isValid = false;
  if (typeof value === 'string') {
    const array = value.split(':');
    isValid =
      array.every((datePart, index) => {
        let condition = false;
        if (index === 0) {
          // hours
          condition = Number(datePart) >= 0 && Number(datePart) < 24;
        } else if ([1, 2].includes(index)) {
          // minutes / seconds
          condition = Number(datePart) >= 0 && Number(datePart) < 60;
        }
        return condition && datePart.length === 2;
      }) && array.length === 3;
  } else if (isDate(value) || value === null) {
    isValid = true;
  }

  return isValid;
};

export { addZero, isTimeValueValid, DAYS_OF_WEEK };
