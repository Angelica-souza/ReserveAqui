import { DateTime } from 'luxon'
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatISODate' })
export class FormatISODate implements PipeTransform {
  transform(date: string) {
    return DateTime.fromISO(date).toFormat('dd/MM/yyyy')
  }
}
