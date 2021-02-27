import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 500,
      timeUnit: '1s', // iterations per second, i.e. 1000 RPS
      duration: '60s', // duration the iterations will attempt to run for
      preAllocatedVUs: 100, // how large the initial pool of VUs would be (match the rps)
      maxVUs: 700, // if the preAllocatedVUs are not enough, we can initialize more,
    },
  },
};

export default function kSix () {
  http.get('http://localhost:3001/shoes/9938485/colors/1/quantities');
  sleep(1);
}