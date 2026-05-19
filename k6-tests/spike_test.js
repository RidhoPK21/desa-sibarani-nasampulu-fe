import http from "k6/http";
import { check, sleep } from "k6";
import { Rate, Trend } from "k6/metrics";

const errorRate = new Rate("error_rate");
const pageLoadTime = new Trend("page_load_time", true);

export const options = {
  stages: [
    { duration: "30s", target: 10 },
    { duration: "30s", target: 10 },
    { duration: "10s", target: 500 },
    { duration: "1m",  target: 500 },
    { duration: "10s", target: 10 },
    { duration: "30s", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<3000"],
    http_req_failed: ["rate<0.05"],
    error_rate: ["rate<0.05"],
  },
};

const BASE_URL = "http://[::1]:5173";
const pages = [{ path: "/", name: "Home Page" }];

export default function () {
  const page = pages[Math.floor(Math.random() * pages.length)];
  const url = `${BASE_URL}${page.path}`;
  const res = http.get(url, {
    headers: { "Accept": "text/html", "User-Agent": "k6-stress-test/1.0" },
    tags: { page: page.name },
  });
  const success = check(res, {
    "status 500": (r) => r.status === 500,
    "response time < 3s": (r) => r.timings.duration < 3000,
    "body tidak kosong": (r) => r.body && r.body.length > 0,
  });
  errorRate.add(!success);
  pageLoadTime.add(res.timings.duration, { page: page.name });
  sleep(Math.random() * 2 + 1);
}