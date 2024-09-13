import http from "k6/http";
import { crypto } from 'k6/experimental/webcrypto';

export const options = {
  duration: "10s",
  vus: 10,
};

export default function () {
  http.post(
    "http://localhost:7800/api/assignment",
    JSON.stringify({user: crypto.randomUUID().toString()}),
  );
}