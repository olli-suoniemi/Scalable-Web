## K6 performance tests:

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


### Database observations and adding indexes

Database:

                 List of relations
 Schema |         Name          | Type  |  Owner   
--------+-----------------------+-------+----------
 public | answers               | table | username
 public | courses               | table | username
 public | flyway_schema_history | table | username
 public | questions             | table | username
 public | upvotes               | table | username


Query:

database=# EXPLAIN SELECT created_at FROM questions
      WHERE user_id = '1'
      ORDER BY created_at DESC
      LIMIT 1;

 Limit  (cost=58.98..58.99 rows=1 width=8)
   ->  Sort  (cost=58.98..58.99 rows=4 width=8)
         Sort Key: created_at DESC
         ->  Seq Scan on questions  (cost=0.00..58.96 rows=4 width=8)
               Filter: (user_id = '1'::text)
(5 rows)


Adding index:

database=# CREATE INDEX idx_questions_user_created_at ON questions (user_id, created_at);

Query again:

database=# EXPLAIN SELECT created_at FROM questions
      WHERE user_id = '1'
      ORDER BY created_at DESC
      LIMIT 1;

 Limit  (cost=0.28..1.30 rows=1 width=8)
   ->  Index Only Scan Backward using idx_questions_user_created_at on questions  (cost=0.28..4.35 rows=4 width=8)
         Index Cond: (user_id = '1'::text)
(3 rows)


Conclusion:

Performance increased substantically. Scan cost dropped from 58.96 to 4.35


<br>


Query:

database=# EXPLAIN SELECT * FROM courses ORDER BY name ASC;

 Sort  (cost=16.39..16.74 rows=140 width=552)
   Sort Key: name
   ->  Seq Scan on courses  (cost=0.00..11.40 rows=140 width=552)
(3 rows)


Create index:

database=# CREATE INDEX idx_courses_name ON courses (name);

Query again:

database=# EXPLAIN SELECT * FROM courses ORDER BY name ASC;

 Sort  (cost=1.08..1.09 rows=4 width=552)
   Sort Key: name
   ->  Seq Scan on courses  (cost=0.00..1.04 rows=4 width=552)
(3 rows)

Conclusion:

Cost dropped from 16.74 to 1.04.


<br>

Query:

database=# EXPLAIN SELECT q.*, COUNT(u.id) AS upvote_count
FROM questions q
LEFT JOIN upvotes u ON u.entity_type = 'question' AND u.entity_id = q.id
WHERE q.course_id = 2
GROUP BY q.id
ORDER BY COALESCE(MAX(u.created_at), q.created_at) DESC, q.last_updated DESC
LIMIT 1 OFFSET 20;

 Limit  (cost=16.52..16.53 rows=1 width=90)
   ->  Sort  (cost=16.52..16.52 rows=1 width=90)
         Sort Key: (COALESCE(max(u.created_at), q.created_at)) DESC, q.last_updated DESC
         ->  GroupAggregate  (cost=16.49..16.51 rows=1 width=90)
               Group Key: q.id
               ->  Sort  (cost=16.49..16.49 rows=1 width=86)
                     Sort Key: q.id
                     ->  Nested Loop Left Join  (cost=0.43..16.48 rows=1 width=86)
                           ->  Index Scan using idx_questions_course_id on questions q  (cost=0.28..8.29 rows=1 width=74)
                                 Index Cond: (course_id = 2)
                           ->  Index Scan using idx_upvotes_entity on upvotes u  (cost=0.15..8.17 rows=1 width=16)
                                 Index Cond: (((entity_type)::text = 'question'::text) AND (entity_id = q.id))


Create index:

database=# CREATE INDEX idx_upvotes_entity_created_at ON upvotes (entity_type, entity_id, created_at);

Query again:

database=# EXPLAIN SELECT q.*, COUNT(u.id) AS upvote_count
FROM questions q
LEFT JOIN upvotes u ON u.entity_type = 'question' AND u.entity_id = q.id
WHERE q.course_id = 2
GROUP BY q.id
ORDER BY COALESCE(MAX(u.created_at), q.created_at) DESC, q.last_updated DESC
LIMIT 1 OFFSET 20;

 Limit  (cost=9.51..9.51 rows=1 width=90)
   ->  Sort  (cost=9.50..9.51 rows=1 width=90)
         Sort Key: (COALESCE(max(u.created_at), q.created_at)) DESC, q.last_updated DESC
         ->  GroupAggregate  (cost=9.47..9.49 rows=1 width=90)
               Group Key: q.id
               ->  Sort  (cost=9.47..9.47 rows=1 width=86)
                     Sort Key: q.id
                     ->  Nested Loop Left Join  (cost=0.28..9.46 rows=1 width=86)
                           Join Filter: (u.entity_id = q.id)
                           ->  Index Scan using idx_questions_course_id on questions q  (cost=0.28..8.29 rows=1 width=74)
                                 Index Cond: (course_id = 2)
                           ->  Seq Scan on upvotes u  (cost=0.00..1.15 rows=1 width=16)
                                 Filter: ((entity_type)::text = 'question'::text)
(13 rows)

Conclusion:

Cost dropped from 16.53 to 9.51

<br>

Query:

database=# EXPLAIN       SELECT created_at FROM answers
      WHERE user_id = '2'
      ORDER BY created_at DESC
      LIMIT 1;

 Limit  (cost=14.29..14.30 rows=1 width=8)
   ->  Sort  (cost=14.29..14.30 rows=4 width=8)
         Sort Key: created_at DESC
         ->  Seq Scan on answers  (cost=0.00..14.28 rows=4 width=8)
               Filter: (user_id = '2'::text)

Create index:

database=# CREATE INDEX idx_answers_user_id_created_at ON answers (user_id, created_at);

Query again:

database=# EXPLAIN       SELECT created_at FROM answers
      WHERE user_id = '2'
      ORDER BY created_at DESC
      LIMIT 1;

 Limit  (cost=0.14..4.00 rows=1 width=8)
   ->  Index Only Scan Backward using idx_answers_user_id_created_at on answers  (cost=0.14..11.70 rows=3 width=8)
         Index Cond: (user_id = '2'::text)

Conclusion:

Cost dropped from 14.30 to 4.00

## K6 performance tests with 2 replicas of API and LLM-API after adding the indexes above

### Getting questions:

     execution: local
        script: get-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 6.4 MB 637 kB/s
     data_sent......................: 2.0 MB 195 kB/s
     http_req_blocked...............: avg=4.96µs  min=669ns    med=1.6µs   max=1.77ms   p(90)=2.96µs   p(95)=3.7µs   
     http_req_connecting............: avg=363ns   min=0s       med=0s      max=998.11µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=5.18ms  min=886.44µs med=4.28ms  max=834.45ms p(90)=6.72ms   p(95)=7.66ms  
       { expected_response:true }...: avg=5.18ms  min=886.44µs med=4.28ms  max=834.45ms p(90)=6.72ms   p(95)=7.66ms  
     http_req_failed................: 0.00%  ✓ 0           ✗ 18791
     http_req_receiving.............: avg=72.53µs min=10.18µs  med=27.87µs max=5.57ms   p(90)=131.75µs p(95)=298.21µs
     http_req_sending...............: avg=24.72µs min=3.57µs   med=7.6µs   max=5.4ms    p(90)=17.32µs  p(95)=61.21µs 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=5.08ms  min=809.69µs med=4.19ms  max=833.76ms p(90)=6.59ms   p(95)=7.54ms  
     http_reqs......................: 18791  1878.366531/s
     iteration_duration.............: avg=5.29ms  min=1.05ms   med=4.38ms  max=834.52ms p(90)=6.84ms   p(95)=7.79ms  
     iterations.....................: 18791  1878.366531/s
     vus............................: 10     min=10        max=10 
     vus_max........................: 10     min=10        max=10 


running (10.0s), 00/10 VUs, 18791 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s


### Getting courses

        script: get-courses.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 13 MB  1.3 MB/s
     data_sent......................: 2.2 MB 218 kB/s
     http_req_blocked...............: avg=5.51µs  min=668ns    med=1.56µs  max=2.26ms  p(90)=2.86µs   p(95)=3.61µs  
     http_req_connecting............: avg=282ns   min=0s       med=0s      max=1.22ms  p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=4.03ms  min=975.41µs med=3.85ms  max=20.75ms p(90)=5.77ms   p(95)=6.45ms  
       { expected_response:true }...: avg=4.03ms  min=975.41µs med=3.85ms  max=20.75ms p(90)=5.77ms   p(95)=6.45ms  
     http_req_failed................: 0.00%  ✓ 0          ✗ 23937
     http_req_receiving.............: avg=71.58µs min=10.26µs  med=26.62µs max=7.57ms  p(90)=130.78µs p(95)=307.82µs
     http_req_sending...............: avg=26.09µs min=3.42µs   med=7.16µs  max=7.35ms  p(90)=16.57µs  p(95)=60.99µs 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s      p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.94ms  min=933µs    med=3.75ms  max=20.71ms p(90)=5.64ms   p(95)=6.32ms  
     http_reqs......................: 23937  2392.84835/s
     iteration_duration.............: avg=4.15ms  min=1.04ms   med=3.96ms  max=20.81ms p(90)=5.89ms   p(95)=6.6ms   
     iterations.....................: 23937  2392.84835/s
     vus............................: 10     min=10       max=10 
     vus_max........................: 10     min=10       max=10 


running (10.0s), 00/10 VUs, 23937 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

### Posting questions:

        script: post-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 565 kB 56 kB/s
     data_sent......................: 636 kB 64 kB/s
     http_req_blocked...............: avg=8.66µs   min=848ns   med=2.38µs  max=2.85ms   p(90)=3.92µs  p(95)=4.86µs  
     http_req_connecting............: avg=1.05µs   min=0s      med=0s      max=763.77µs p(90)=0s      p(95)=0s      
     http_req_duration..............: avg=31.12ms  min=6.19ms  med=28.18ms max=126.25ms p(90)=44.58ms p(95)=53.18ms 
       { expected_response:true }...: avg=31.12ms  min=6.19ms  med=28.18ms max=126.25ms p(90)=44.58ms p(95)=53.18ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 3181
     http_req_receiving.............: avg=132.46µs min=10.23µs med=50.14µs max=6.01ms   p(90)=245.4µs p(95)=581.65µs
     http_req_sending...............: avg=52.46µs  min=4.76µs  med=13.9µs  max=4.54ms   p(90)=52.76µs p(95)=217.88µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s      p(95)=0s      
     http_req_waiting...............: avg=30.93ms  min=6.12ms  med=27.97ms max=126.17ms p(90)=44.25ms p(95)=53.08ms 
     http_reqs......................: 3181   317.352322/s
     iteration_duration.............: avg=31.44ms  min=6.34ms  med=28.46ms max=127.32ms p(90)=44.83ms p(95)=53.68ms 
     iterations.....................: 3181   317.352322/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.0s), 00/10 VUs, 3181 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

## K6 performance tests with 2 replicas after adding indexes and caching.

### Getting questions:

        script: get-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 90 MB  9.0 MB/s
     data_sent......................: 2.2 MB 224 kB/s
     http_req_blocked...............: avg=5.28µs  min=683ns    med=1.68µs max=2.15ms   p(90)=2.92µs   p(95)=3.66µs  
     http_req_connecting............: avg=446ns   min=0s       med=0s     max=1.05ms   p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=4.5ms   min=710.64µs med=4.02ms max=422.1ms  p(90)=6.25ms   p(95)=7.15ms  
       { expected_response:true }...: avg=4.5ms   min=710.64µs med=4.02ms max=422.1ms  p(90)=6.25ms   p(95)=7.15ms  
     http_req_failed................: 0.00%  ✓ 0           ✗ 21493
     http_req_receiving.............: avg=90.92µs min=12.97µs  med=36µs   max=6.83ms   p(90)=182.74µs p(95)=378.39µs
     http_req_sending...............: avg=26.02µs min=3.69µs   med=8.04µs max=4.3ms    p(90)=18.59µs  p(95)=73.79µs 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s     max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=4.39ms  min=658.26µs med=3.9ms  max=421.94ms p(90)=6.09ms   p(95)=6.99ms  
     http_reqs......................: 21493  2148.739805/s
     iteration_duration.............: avg=4.62ms  min=758.33µs med=4.13ms max=422.41ms p(90)=6.38ms   p(95)=7.3ms   
     iterations.....................: 21493  2148.739805/s
     vus............................: 10     min=10        max=10 
     vus_max........................: 10     min=10        max=10 


running (10.0s), 00/10 VUs, 21493 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

### Getting courses:

        script: get-courses.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 14 MB  1.3 MB/s
     data_sent......................: 2.3 MB 234 kB/s
     http_req_blocked...............: avg=4.82µs  min=648ns    med=1.53µs  max=1.86ms   p(90)=2.72µs   p(95)=3.44µs  
     http_req_connecting............: avg=259ns   min=0s       med=0s      max=823.18µs p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=3.75ms  min=774.71µs med=3.47ms  max=32.44ms  p(90)=5.51ms   p(95)=6.4ms   
       { expected_response:true }...: avg=3.75ms  min=774.71µs med=3.47ms  max=32.44ms  p(90)=5.51ms   p(95)=6.4ms   
     http_req_failed................: 0.00%  ✓ 0          ✗ 25711
     http_req_receiving.............: avg=69.83µs min=9.86µs   med=27.13µs max=6.73ms   p(90)=131.17µs p(95)=286.57µs
     http_req_sending...............: avg=25.77µs min=3.46µs   med=7.29µs  max=6.48ms   p(90)=17.38µs  p(95)=75.86µs 
     http_req_tls_handshaking.......: avg=0s      min=0s       med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=3.65ms  min=738.72µs med=3.38ms  max=32.41ms  p(90)=5.38ms   p(95)=6.27ms  
     http_reqs......................: 25711  2570.42661/s
     iteration_duration.............: avg=3.86ms  min=820.98µs med=3.58ms  max=32.47ms  p(90)=5.65ms   p(95)=6.56ms  
     iterations.....................: 25711  2570.42661/s
     vus............................: 10     min=10       max=10 
     vus_max........................: 10     min=10       max=10 


running (10.0s), 00/10 VUs, 25711 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

### Posting questions:

        script: post-questions.js
        output: -

     scenarios: (100.00%) 1 scenario, 10 max VUs, 40s max duration (incl. graceful stop):
              * default: 10 looping VUs for 10s (gracefulStop: 30s)


     data_received..................: 470 kB 47 kB/s
     data_sent......................: 528 kB 53 kB/s
     http_req_blocked...............: avg=8.07µs   min=804ns   med=2.27µs  max=2.47ms   p(90)=3.59µs   p(95)=4.28µs  
     http_req_connecting............: avg=4.26µs   min=0s      med=0s      max=2.31ms   p(90)=0s       p(95)=0s      
     http_req_duration..............: avg=37.67ms  min=4.58ms  med=29.43ms max=646.93ms p(90)=55.53ms  p(95)=71.86ms 
       { expected_response:true }...: avg=37.67ms  min=4.58ms  med=29.43ms max=646.93ms p(90)=55.53ms  p(95)=71.86ms 
     http_req_failed................: 0.00%  ✓ 0          ✗ 2639
     http_req_receiving.............: avg=112.03µs min=11.14µs med=51.83µs max=6.47ms   p(90)=192.43µs p(95)=455.76µs
     http_req_sending...............: avg=43.79µs  min=5.01µs  med=13.88µs max=7.73ms   p(90)=33.71µs  p(95)=153.44µs
     http_req_tls_handshaking.......: avg=0s       min=0s      med=0s      max=0s       p(90)=0s       p(95)=0s      
     http_req_waiting...............: avg=37.51ms  min=4.51ms  med=29.29ms max=646.85ms p(90)=55.42ms  p(95)=71.76ms 
     http_reqs......................: 2639   263.153195/s
     iteration_duration.............: avg=37.92ms  min=4.7ms   med=29.68ms max=647.09ms p(90)=55.91ms  p(95)=71.97ms 
     iterations.....................: 2639   263.153195/s
     vus............................: 10     min=10       max=10
     vus_max........................: 10     min=10       max=10


running (10.0s), 00/10 VUs, 2639 complete and 0 interrupted iterations
default ✓ [======================================] 10 VUs  10s

### Conclusion

Overall, while the system performs well under low load, the increase in replicas, particularly in write-heavy scenarios like posting questions, resulted in notable increases in response times and reduced throughput.

It seems that the database was a bottleneck since increasing the replicas of the API and the LLM-API didn't increase the system performance. After adding the indexes the performance was much better. Getting questions and answers performed much better after adding indexes. Also adding questions performed better. This is due to that that the API has to do few SELECT queries for checking purposes before the insertions. The increase in performance is due to to performance improvements in the SELECT queries.

After adding database indexes, caching was added to the application. Everything was cached and cache is set to flush when there is added a new question or answer to the database or a question or answer is upvoted. There was slight improvement in performance getting courses. Also slight improvement was in getting questions. There was a slight decrease in performance in adding questions after adding caching. This is expected as adding new question to the database requires flushing the cache so it generates some extra work.