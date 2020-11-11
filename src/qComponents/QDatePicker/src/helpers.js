import { format, isDate } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const formatLocalDate = (value, dateFnsFormat) => {
  return format(value, dateFnsFormat ?? 'dd MMM yyyy', {
    locale: ruLocale
  });
};

const setTimeToDate = (date, type, value) => {
  let newDate = date;
  if (isDate(date)) {
    newDate = new Date(date);
    switch (type) {
      case 'hours':
        newDate.setHours(Number(value));
        break;
      case 'minutes':
        newDate.setMinutes(Number(value));
        break;
      case 'seconds':
        newDate.setSeconds(Number(value));
        break;
      default:
        break;
    }
  }

  return newDate;
};

const clearTime = function(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const clearMilliseconds = function(date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    0
  );
};

export { clearTime, clearMilliseconds, formatLocalDate, setTimeToDate };
