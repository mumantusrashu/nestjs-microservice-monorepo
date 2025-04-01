import { Job } from '../decorators/job-decorator';
import { AbstactrJob } from './abstact.job';

@Job({
  name: 'fibonacci',
  description: 'Calculates the Fibonacci number for a given input',
})
export class FibonacciJob extends AbstactrJob {}
