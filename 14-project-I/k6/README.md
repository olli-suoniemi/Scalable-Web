### Getting assignments with 1 grader-api replica and 1 programming-api replica:

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 4.8 MB 485 kB/s
     data_sent......................: 1.3 MB 127 kB/s
     http_req_blocked...............: avg=4.42µs  min=759ns   med=2.22µs  max=1.12ms   p(90)=3.54µs   p(95)=4.52µs  
     http_req_connecting............: avg=143ns   min=0s      med=0s      max=225.26µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=12.6ms  min=3.17ms  med=11.03ms max=781.38ms p(90)=15.75ms  p(95)=17.83ms 
       { expected_response:true }...: avg=12.6ms  min=3.17ms  med=11.03ms max=781.38ms p(90)=15.75ms  p(95)=17.83ms 
     http_req_failed................: 0.00%  ✓ 0         ✗ 7821
     http_req_receiving.............: avg=87.46µs min=11.74µs med=51.29µs max=4.61ms   p(90)=165.62µs p(95)=304.6µs 
     http_req_sending...............: avg=30.6µs  min=4.91µs  med=14.54µs max=1.76ms   p(90)=32.12µs  p(95)=104.09µs
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=12.48ms min=3.08ms  med=10.92ms max=781.31ms p(90)=15.63ms  p(95)=17.68ms 
     http_reqs......................: 7821   781.54944/s
     iteration_duration.............: avg=12.76ms min=3.26ms  med=11.2ms  max=782.41ms p(90)=15.96ms  p(95)=17.97ms 
     iterations.....................: 7821   781.54944/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10


running (10.0s), 00/10 VUs, 7821 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s


### Getting assignments with 2 grader-api replicas and 2 programming-api replicas:

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 4.9 MB 488 kB/s
     data_sent......................: 1.3 MB 127 kB/s
     http_req_blocked...............: avg=5.41µs  min=757ns   med=2.39µs  max=2.49ms   p(90)=3.81µs   p(95)=4.69µs  
     http_req_connecting............: avg=818ns   min=0s      med=0s      max=2.46ms   p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=12.52ms min=1.88ms  med=10.56ms max=750.49ms p(90)=17.42ms  p(95)=20.98ms 
       { expected_response:true }...: avg=12.52ms min=1.88ms  med=10.56ms max=750.49ms p(90)=17.42ms  p(95)=20.98ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 7872
     http_req_receiving.............: avg=91.09µs min=11.84µs med=55.22µs max=3.58ms   p(90)=175.19µs p(95)=314.89µs
     http_req_sending...............: avg=34.78µs min=5.06µs  med=15.27µs max=3.01ms   p(90)=31.76µs  p(95)=109.35µs
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=12.39ms min=1.83ms  med=10.44ms max=748.12ms p(90)=17.29ms  p(95)=20.82ms 
     http_reqs......................: 7872   786.681245/s
     iteration_duration.............: avg=12.68ms min=1.93ms  med=10.72ms max=751.09ms p(90)=17.58ms  p(95)=21.14ms 
     iterations.....................: 7872   786.681245/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.0s), 00/10 VUs, 7872 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

### Getting assignments with 10 grader-api replicas and 10 programming-api replicas:

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 2.1 MB 209 kB/s
     data_sent......................: 548 kB 55 kB/s
     http_req_blocked...............: avg=7.13µs  min=785ns   med=2.51µs  max=2.38ms p(90)=3.98µs   p(95)=4.87µs  
     http_req_connecting............: avg=2.36µs  min=0s      med=0s      max=1.49ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=29.41ms min=2.99ms  med=17.3ms  max=2.4s   p(90)=26.55ms  p(95)=30.16ms 
       { expected_response:true }...: avg=29.41ms min=2.99ms  med=17.3ms  max=2.4s   p(90)=26.55ms  p(95)=30.16ms 
     http_req_failed................: 0.00%  ✓ 0         ✗ 3380
     http_req_receiving.............: avg=97.05µs min=12.62µs med=59.6µs  max=3.22ms p(90)=202.95µs p(95)=374.8µs 
     http_req_sending...............: avg=33.96µs min=5.23µs  med=16.53µs max=1.74ms p(90)=38.99µs  p(95)=133.16µs
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=29.28ms min=2.93ms  med=17.17ms max=2.4s   p(90)=26.33ms  p(95)=30.01ms 
     http_reqs......................: 3380   337.42587/s
     iteration_duration.............: avg=29.59ms min=3.07ms  med=17.5ms  max=2.4s   p(90)=26.75ms  p(95)=30.36ms 
     iterations.....................: 3380   337.42587/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10


running (10.0s), 00/10 VUs, 3380 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s




### Posting assignments with 1 grader-api replica and 1 programming-api replica:

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 264 kB 26 kB/s
     data_sent......................: 813 kB 81 kB/s
     http_req_blocked...............: avg=5.88µs  min=743ns   med=2.19µs  max=786.2µs  p(90)=3.6µs    p(95)=4.92µs  
     http_req_connecting............: avg=1.45µs  min=0s      med=0s      max=377.18µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=68.19ms min=7.49ms  med=34.72ms max=4.73s    p(90)=52ms     p(95)=62.05ms 
       { expected_response:true }...: avg=68.19ms min=7.49ms  med=34.72ms max=4.73s    p(90)=52ms     p(95)=62.05ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 1465
     http_req_receiving.............: avg=87.33µs min=10.57µs med=49.62µs max=2.21ms   p(90)=148.63µs p(95)=342.63µs
     http_req_sending...............: avg=36.11µs min=5.24µs  med=14.01µs max=3.48ms   p(90)=30.91µs  p(95)=87.36µs 
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=68.07ms min=7.42ms  med=34.6ms  max=4.73s    p(90)=51.79ms  p(95)=61.95ms 
     http_reqs......................: 1465   146.115572/s
     iteration_duration.............: avg=68.39ms min=7.59ms  med=34.89ms max=4.73s    p(90)=52.34ms  p(95)=62.13ms 
     iterations.....................: 1465   146.115572/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.0s), 00/10 VUs, 1465 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s


### Posting assignments with 2 grader-api replicas and 2 programming-api replicas:

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 344 kB 34 kB/s
     data_sent......................: 1.1 MB 106 kB/s
     http_req_blocked...............: avg=8.84µs   min=744ns   med=2.38µs  max=1.51ms   p(90)=3.9µs    p(95)=5.08µs  
     http_req_connecting............: avg=1.12µs   min=0s      med=0s      max=444.09µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=52.19ms  min=8.13ms  med=43.91ms max=912.15ms p(90)=76.87ms  p(95)=90.79ms 
       { expected_response:true }...: avg=52.19ms  min=8.13ms  med=43.91ms max=912.15ms p(90)=76.87ms  p(95)=90.79ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 1911
     http_req_receiving.............: avg=112.33µs min=11.09µs med=55.79µs max=4.76ms   p(90)=208.56µs p(95)=442.49µs
     http_req_sending...............: avg=38.93µs  min=5.21µs  med=15.25µs max=2.28ms   p(90)=40.17µs  p(95)=132.3µs 
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=52.03ms  min=8.02ms  med=43.76ms max=911.94ms p(90)=76.55ms  p(95)=90.72ms 
     http_reqs......................: 1911   190.476123/s
     iteration_duration.............: avg=52.42ms  min=8.24ms  med=44.15ms max=913.73ms p(90)=77.45ms  p(95)=90.94ms 
     iterations.....................: 1911   190.476123/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.0s), 00/10 VUs, 1911 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s



### Posting assignments with 10 grader-api replicas and 10 programming-api replicas:

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 182 kB 18 kB/s
     data_sent......................: 562 kB 56 kB/s
     http_req_blocked...............: avg=12.44µs min=729ns   med=2.44µs  max=2.11ms p(90)=4.21µs  p(95)=5.31µs  
     http_req_connecting............: avg=5.12µs  min=0s      med=0s      max=1.75ms p(90)=0s      p(95)=0s      
     http_req_duration..............: avg=98.87ms min=12.1ms  med=54.44ms max=4.12s  p(90)=97.72ms p(95)=125.4ms 
       { expected_response:true }...: avg=98.87ms min=12.1ms  med=54.44ms max=4.12s  p(90)=97.72ms p(95)=125.4ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 1013
     http_req_receiving.............: avg=120.4µs min=11.54µs med=55.94µs max=2.45ms p(90)=260.8µs p(95)=525.14µs
     http_req_sending...............: avg=45.62µs min=5.05µs  med=15.42µs max=2.52ms p(90)=48µs    p(95)=184.9µs 
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s     p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=98.7ms  min=12.02ms med=54.29ms max=4.12s  p(90)=97.65ms p(95)=125.32ms
     http_reqs......................: 1013   100.664343/s
     iteration_duration.............: avg=99.1ms  min=12.18ms med=54.7ms  max=4.12s  p(90)=97.96ms p(95)=125.61ms
     iterations.....................: 1013   100.664343/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.1s), 00/10 VUs, 1013 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s


### Reflection:

Interesting is that when I increase the replicas to 10 the iterations get halfed. Otherwise it seems that the two replicas is a good bet. When scaling to 10 replicas for both services, the throughput (iterations per second) drops significantly. The number of complete iterations is roughly halved compared to 2 replicas, and average response times (http_req_duration and iteration_duration) increase substantially. This indicates that increasing the replicas to 10 likely introduces some overhead, such as increased coordination costs or bottlenecks elsewhere in the system (e.g., database, load balancer, or network), rather than simply improving performance.

From 1 replica to 2 for both the grader-api and programming-api, the performance seems to improve slightly.


### Conclusion:

Scaling to 2 replicas appears to provide the best performance under the current workload. Increasing replicas further (up to 10) seems to diminish performance rather than improve it.

It would be useful to monitor other aspects of the system (e.g., database queries, caching layers, network latency, load balancer) to see where the performance degradation occurs when scaling to 10 replicas.