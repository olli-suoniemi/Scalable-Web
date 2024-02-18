With caching:
-------------
scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
* default: 10 looping VUs for 10s (gracefulStop: 30s)

data_received..................: 19 MB  1.9 MB/s
data_sent......................: 2.4 MB 243 kB/s
http_req_blocked...............: med=1.29µs  p(99)=8.23µs  
http_req_connecting............: med=0s      p(99)=0s      
http_req_duration..............: med=3.03ms  p(99)=10.59ms 
{ expected_response:true }...: med=3.03ms  p(99)=10.59ms 
http_req_failed................: 0.00%  ✓ 0           ✗ 28537
http_req_receiving.............: med=24.25µs p(99)=205.66µs
http_req_sending...............: med=5.79µs  p(99)=30.09µs 
http_req_tls_handshaking.......: med=0s      p(99)=0s      
http_req_waiting...............: med=2.99ms  p(99)=10.48ms 
http_reqs......................: 28537  2852.980328/s
iteration_duration.............: med=3.08ms  p(99)=10.67ms 
iterations.....................: 28537  2852.980328/s
vus............................: 10     min=10        max=10 
vus_max........................: 10     min=10        max=10

Without caching:
----------------
scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
* default: 10 looping VUs for 10s (gracefulStop: 30s)

data_received..................: 17 MB  1.7 MB/s
data_sent......................: 2.2 MB 218 kB/s
http_req_blocked...............: med=1.33µs p(99)=7.62µs  
http_req_connecting............: med=0s     p(99)=0s      
http_req_duration..............: med=3.19ms p(99)=10.71ms 
  { expected_response:true }...: med=3.19ms p(99)=10.71ms 
http_req_failed................: 0.00%  ✓ 0           ✗ 25653
http_req_receiving.............: med=24.7µs p(99)=204.13µs
http_req_sending...............: med=5.94µs p(99)=26.86µs 
http_req_tls_handshaking.......: med=0s     p(99)=0s      
http_req_waiting...............: med=3.15ms p(99)=10.61ms 
http_reqs......................: 25653  2563.485343/s
iteration_duration.............: med=3.24ms p(99)=10.77ms 
iterations.....................: 25653  2563.485343/s
vus............................: 10     min=10        max=10 
vus_max........................: 10     min=10        max=10 

There really isn't much difference in the results. The differences in data transfer rates, HTTP request durations, and other metrics are relatively small, indicating that the caching mechanism may not be significantly impacting the performance of the system under test in this specific scenario.

Maybe the data receiced from the database is not that big. They are just small todos, so maybe the caching here is not so benefitial. Maybe the difference
would be bigger if we would be retrieving something larger from the database.

Computer specs:

os: Linux Ubuntu
memory
    description: System memory
    physical id: 0
    size: 16GiB
cpu
    product: Intel(R) Core(TM) i5-7500 CPU @ 3.40GHz
    vendor: Intel Corp.
    physical id: 1
    bus info: cpu@0
    version: 6.158.9
    size: 3752MHz
    capacity: 3800MHz
    width: 64 bits