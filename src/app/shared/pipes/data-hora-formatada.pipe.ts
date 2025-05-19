import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dataHoraFormatada'
})
export class DataHoraFormatadaPipe implements PipeTransform {

  transform(value: Date | string | null | undefined): string {
    if (!value) return '';
    const data = new Date(value);
    return `${data.toLocaleDateString('pt-BR')} às ${data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })}`;
  }

}
