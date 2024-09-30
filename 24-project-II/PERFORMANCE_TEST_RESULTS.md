### Posting questions with 1 replica:

     execution: local
        script: post-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 652 kB 65 kB/s
     data_sent......................: 732 kB 73 kB/s
     http_req_blocked...............: avg=6.32µs  min=830ns   med=2.01µs  max=5.43ms   p(90)=3.2µs    p(95)=3.8µs   
     http_req_connecting............: avg=1.18µs  min=0s      med=0s      max=856.91µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=27.12ms min=6.18ms  med=23.37ms max=697ms    p(90)=35.71ms  p(95)=42.77ms 
       { expected_response:true }...: avg=27.12ms min=6.18ms  med=23.37ms max=697ms    p(90)=35.71ms  p(95)=42.77ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 3660
     http_req_receiving.............: avg=78.7µs  min=10.82µs med=37.17µs max=5ms      p(90)=100.59µs p(95)=233.16µs
     http_req_sending...............: avg=35.21µs min=4.8µs   med=12µs    max=11.07ms  p(90)=25.85µs  p(95)=66.2µs  
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=27.01ms min=6.08ms  med=23.27ms max=696.93ms p(90)=35.5ms   p(95)=42.75ms 
     http_reqs......................: 3660   365.014026/s
     iteration_duration.............: avg=27.35ms min=6.48ms  med=23.61ms max=699.2ms  p(90)=35.86ms  p(95)=43.21ms 
     iterations.....................: 3660   365.014026/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.0s), 00/10 VUs, 3660 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

### Posting questions with 2 replicas:

     execution: local
        script: post-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 430 kB 43 kB/s
     data_sent......................: 480 kB 48 kB/s
     http_req_blocked...............: avg=5.1µs   min=716ns   med=2.31µs  max=888.42µs p(90)=3.52µs   p(95)=4.32µs  
     http_req_connecting............: avg=1.54µs  min=0s      med=0s      max=795.05µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=41.56ms min=5.31ms  med=32.25ms max=643.25ms p(90)=53.64ms  p(95)=82.59ms 
       { expected_response:true }...: avg=41.56ms min=5.31ms  med=32.25ms max=643.25ms p(90)=53.64ms  p(95)=82.59ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 2401
     http_req_receiving.............: avg=83.39µs min=11.34µs med=50.34µs max=6.73ms   p(90)=124.04µs p(95)=256.98µs
     http_req_sending...............: avg=40.48µs min=4.98µs  med=13.85µs max=5.64ms   p(90)=36.24µs  p(95)=109.45µs
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=41.43ms min=5.24ms  med=32.14ms max=643.18ms p(90)=53.44ms  p(95)=82.56ms 
     http_reqs......................: 2401   238.471562/s
     iteration_duration.............: avg=41.78ms min=5.6ms   med=32.48ms max=643.39ms p(90)=53.86ms  p(95)=82.71ms 
     iterations.....................: 2401   238.471562/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.1s), 00/10 VUs, 2401 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

### Posting questions with 5 replicas:

     execution: local
        script: post-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 214 kB 21 kB/s
     data_sent......................: 239 kB 24 kB/s
     http_req_blocked...............: avg=28.86µs min=845ns   med=2.41µs  max=8.1ms  p(90)=3.59µs   p(95)=4.45µs  
     http_req_connecting............: avg=19.68µs min=0s      med=0s      max=8.02ms p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=83.78ms min=8.55ms  med=38.07ms max=2.05s  p(90)=82.19ms  p(95)=326.9ms 
       { expected_response:true }...: avg=83.78ms min=8.55ms  med=38.07ms max=2.05s  p(90)=82.19ms  p(95)=326.9ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 1194
     http_req_receiving.............: avg=88.6µs  min=10.04µs med=55.03µs max=5.39ms p(90)=116.38µs p(95)=229.98µs
     http_req_sending...............: avg=31.61µs min=5.37µs  med=14.3µs  max=3.15ms p(90)=29.31µs  p(95)=72.17µs 
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s     p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=83.66ms min=8.46ms  med=37.91ms max=2.04s  p(90)=82.13ms  p(95)=326.82ms
     http_reqs......................: 1194   118.524138/s
     iteration_duration.............: avg=84.03ms min=8.75ms  med=38.3ms  max=2.05s  p(90)=82.32ms  p(95)=327.06ms
     iterations.....................: 1194   118.524138/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.1s), 00/10 VUs, 1194 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

### Getting courses with 1 replica:

     execution: local
        script: get-courses.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 14 MB  1.4 MB/s
     data_sent......................: 2.4 MB 238 kB/s
     http_req_blocked...............: avg=4.47µs  min=579ns    med=1.44µs  max=2.74ms   p(90)=2.6µs   p(95)=3.17µs  
     http_req_connecting............: avg=386ns   min=0s       med=0s      max=1.42ms   p(90)=0s      p(95)=0s      
     http_req_duration..............: avg=3.72ms  min=851.57µs med=3.16ms  max=777.55ms p(90)=4.98ms  p(95)=5.89ms  
       { expected_response:true }...: avg=3.72ms  min=851.57µs med=3.16ms  max=777.55ms p(90)=4.98ms  p(95)=5.89ms  
     http_req_failed................: 0.00%  ✓ 0           ✗ 26110
     http_req_receiving.............: avg=57.1µs  min=10.16µs  med=23.17µs max=8.33ms   p(90)=90.15µs p(95)=213.98µs
     http_req_sending...............: avg=18.44µs min=3.41µs   med=6.23µs  max=6.65ms   p(90)=13.05µs p(95)=34.58µs 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=3.64ms  min=829.93µs med=3.08ms  max=777.47ms p(90)=4.88ms  p(95)=5.8ms   
     http_reqs......................: 26110  2610.306936/s
     iteration_duration.............: avg=3.81ms  min=893.3µs  med=3.24ms  max=779.01ms p(90)=5.09ms  p(95)=6ms     
     iterations.....................: 26110  2610.306936/s
     vus............................: 10     min=10        max=10 
     vus_max........................: 10     min=10        max=10 


running (10.0s), 00/10 VUs, 26110 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

### Getting courses with 5 replicas:

     execution: local
        script: get-courses.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 12 MB  1.2 MB/s
     data_sent......................: 2.0 MB 205 kB/s
     http_req_blocked...............: avg=5.28µs  min=678ns    med=1.73µs  max=3.59ms  p(90)=3.08µs   p(95)=3.86µs  
     http_req_connecting............: avg=415ns   min=0s       med=0s      max=1.78ms  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=4.31ms  min=695.04µs med=3.97ms  max=29.48ms p(90)=6.38ms   p(95)=7.46ms  
       { expected_response:true }...: avg=4.31ms  min=695.04µs med=3.97ms  max=29.48ms p(90)=6.38ms   p(95)=7.46ms  
     http_req_failed................: 0.00%  ✓ 0           ✗ 22491
     http_req_receiving.............: avg=70.91µs min=10.65µs  med=29.17µs max=8.17ms  p(90)=125.32µs p(95)=286.66µs
     http_req_sending...............: avg=22.43µs min=3.5µs    med=7.51µs  max=8.09ms  p(90)=16.94µs  p(95)=54.27µs 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=4.22ms  min=632.94µs med=3.88ms  max=29.43ms p(90)=6.27ms   p(95)=7.32ms  
     http_reqs......................: 22491  2247.492018/s
     iteration_duration.............: avg=4.42ms  min=744.12µs med=4.08ms  max=29.54ms p(90)=6.52ms   p(95)=7.6ms   
     iterations.....................: 22491  2247.492018/s
     vus............................: 10     min=10        max=10 
     vus_max........................: 10     min=10        max=10 


running (10.0s), 00/10 VUs, 22491 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s


### Getting questions with 1 replica:

     execution: local
        script: get-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 20 MB  2.0 MB/s
     data_sent......................: 509 kB 51 kB/s
     http_req_blocked...............: avg=5.18µs  min=697ns  med=2.27µs  max=4.69ms   p(90)=3.32µs   p(95)=3.99µs  
     http_req_connecting............: avg=469ns   min=0s     med=0s      max=426.19µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=20.31ms min=5.45ms med=17.67ms max=764.94ms p(90)=27.92ms  p(95)=32.32ms 
       { expected_response:true }...: avg=20.31ms min=5.45ms med=17.67ms max=764.94ms p(90)=27.92ms  p(95)=32.32ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 4894
     http_req_receiving.............: avg=98.78µs min=13.5µs med=57.52µs max=4.42ms   p(90)=143.85µs p(95)=284.22µs
     http_req_sending...............: avg=25.11µs min=3.59µs med=10.53µs max=5.54ms   p(90)=19.87µs  p(95)=31.17µs 
     http_req_tls_handshaking.......: avg=0s      min=0s     med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=20.18ms min=5.36ms med=17.57ms max=764.45ms p(90)=27.83ms  p(95)=32.16ms 
     http_reqs......................: 4894   488.508971/s
     iteration_duration.............: avg=20.43ms min=5.5ms  med=17.81ms max=765.52ms p(90)=28.01ms  p(95)=32.49ms 
     iterations.....................: 4894   488.508971/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.0s), 00/10 VUs, 4894 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s


### Getting questions with 2 replicas:

     execution: local
        script: get-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 19 MB  1.9 MB/s
     data_sent......................: 481 kB 48 kB/s
     http_req_blocked...............: avg=6.69µs  min=742ns   med=2.26µs  max=3.5ms    p(90)=3.32µs   p(95)=3.95µs  
     http_req_connecting............: avg=1.2µs   min=0s      med=0s      max=1.2ms    p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=21.48ms min=5.08ms  med=17.51ms max=893.3ms  p(90)=29.71ms  p(95)=35.09ms 
       { expected_response:true }...: avg=21.48ms min=5.08ms  med=17.51ms max=893.3ms  p(90)=29.71ms  p(95)=35.09ms 
     http_req_failed................: 0.00%  ✓ 0         ✗ 4624
     http_req_receiving.............: avg=97.11µs min=14.02µs med=58.83µs max=7.12ms   p(90)=122.08µs p(95)=232.76µs
     http_req_sending...............: avg=24.19µs min=3.9µs   med=10.63µs max=4.8ms    p(90)=19.02µs  p(95)=30.52µs 
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=21.36ms min=4.99ms  med=17.4ms  max=892.93ms p(90)=29.66ms  p(95)=34.78ms 
     http_reqs......................: 4624   461.96997/s
     iteration_duration.............: avg=21.61ms min=5.16ms  med=17.65ms max=894.29ms p(90)=29.91ms  p(95)=35.17ms 
     iterations.....................: 4624   461.96997/s
     vus............................: 10     min=10      max=10
     vus_max........................: 10     min=10      max=10


running (10.0s), 00/10 VUs, 4624 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

### Getting questions with 5 replicas:

     execution: local
        script: get-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 16 MB  1.6 MB/s
     data_sent......................: 391 kB 39 kB/s
     http_req_blocked...............: avg=4.45µs  min=756ns   med=2.34µs  max=1.07ms   p(90)=3.37µs   p(95)=3.99µs  
     http_req_connecting............: avg=659ns   min=0s      med=0s      max=681.08µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=26.47ms min=5ms     med=17.23ms max=811.08ms p(90)=33.32ms  p(95)=40.85ms 
       { expected_response:true }...: avg=26.47ms min=5ms     med=17.23ms max=811.08ms p(90)=33.32ms  p(95)=40.85ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 3761
     http_req_receiving.............: avg=99.15µs min=14.08µs med=60.59µs max=5.47ms   p(90)=132.02µs p(95)=265.52µs
     http_req_sending...............: avg=25.34µs min=3.89µs  med=11.07µs max=3.82ms   p(90)=19.32µs  p(95)=31.13µs 
     http_req_tls_handshaking.......: avg=0s      min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=26.35ms min=4.91ms  med=17.14ms max=810.92ms p(90)=33.15ms  p(95)=40.63ms 
     http_reqs......................: 3761   374.893566/s
     iteration_duration.............: avg=26.59ms min=5.17ms  med=17.35ms max=811.48ms p(90)=33.44ms  p(95)=40.91ms 
     iterations.....................: 3761   374.893566/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.0s), 00/10 VUs, 3761 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s


### Conclusion

Overall, while the system performs well under low load, the increase in replicas, particularly in write-heavy scenarios like posting questions, resulted in notable increases in response times and reduced throughput