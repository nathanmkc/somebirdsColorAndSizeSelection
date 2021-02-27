import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
  scenarios: {
    constant_request_rate: {
      executor: 'constant-arrival-rate',
      rate: 1000,
      timeUnit: '1s', // iterations per second, i.e. 1000 RPS
      duration: '60s', // duration the iterations will attempt to run for
      preAllocatedVUs: 100, // how large the initial pool of VUs would be (match the rps)
      maxVUs: 500, // if the preAllocatedVUs are not enough, we can initialize more,
    },
  },
};

export default function kSix () {
  var url = 'http://localhost:3001/shoes'
  var model = 10000000 + Math.floor(Math.random()*10000000);
  var payload = JSON.stringify({"name":"test shoe",
  "model": model,
  "quantities": [{"shoe_id": model, "color_id": 1, "quantities": "7:1 8:1 9:2 10:1 11:9 12:0 13:4 14:8 15:1 16:0 17:2 18:0 19:6"}, {"shoe_id": model, "color_id": 7, "quantities": "7:1 8:1 9:2 10:1 11:9 12:0 13:4 14:8 15:1 16:0 17:2 18:0 19:6"}, {"shoe_id": model, "color_id": 9, "quantities": "7:1 8:1 9:2 10:1 11:9 12:0 13:4 14:8 15:1 16:0 17:2 18:0 19:6"}, {"shoe_id": model, "color_id": 14,  "quantities": "7:1 8:1 9:2 10:1 11:9 12:0 13:4 14:8 15:1 16:0 17:2 18:0 19:6"}]
  });
  var params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
  sleep(1);
}