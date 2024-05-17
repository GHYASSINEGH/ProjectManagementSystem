import { Pipe, PipeTransform } from '@angular/core';

interface Task {
  id:any;
  title: string;
  description: string;
  creationDate: string;
  endDate: string;
  status: string;
}
@Pipe({
  name: 'filterByStatus'
})
export class FilterByStatusPipe implements PipeTransform {

  transform(tasks: Task[], status: string): Task[] {
    if (!tasks || !status) {
      return tasks;
    }
    
    return tasks.filter(task => task.status === status);
  }


}
