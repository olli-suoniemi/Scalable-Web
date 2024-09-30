import http from "k6/http";

export const options = {
  duration: "10s",
  vus: 10,
};

export default function () {
  http.get(
    "http://localhost:7800/api/questions?courseID=4",
  );
}