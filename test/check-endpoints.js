import app from '../src/app.js';

async function runEndpointChecks() {
  const server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  const port = server.address().port;
  const baseUrl = `http://127.0.0.1:${port}`;

  console.log(`\n==================================================`);
  console.log(`  VERIFYING ALL API ENDPOINTS ON ${baseUrl}`);
  console.log(`==================================================\n`);

  const tests = [
    {
      name: '1. GET / (Root Welcome Endpoint)',
      method: 'GET',
      path: '/',
      expectedStatus: 200
    },
    {
      name: '2. GET /api/health (Health Check Endpoint)',
      method: 'GET',
      path: '/api/health',
      expectedStatus: 200
    },
    {
      name: '3. GET /api/items (Fetch All Items)',
      method: 'GET',
      path: '/api/items',
      expectedStatus: 200
    },
    {
      name: '4. GET /api/items/1 (Fetch Single Item by Valid ID)',
      method: 'GET',
      path: '/api/items/1',
      expectedStatus: 200
    },
    {
      name: '5. GET /api/items/999 (Fetch Non-Existent Item ID -> 404)',
      method: 'GET',
      path: '/api/items/999',
      expectedStatus: 404
    },
    {
      name: '6. POST /api/items (Create New Item - Valid Payload -> 201)',
      method: 'POST',
      path: '/api/items',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Learn API Testing',
        description: 'Verify each endpoint behaves properly'
      }),
      expectedStatus: 201
    },
    {
      name: '7. POST /api/items (Validation Error: Missing Title -> 400)',
      method: 'POST',
      path: '/api/items',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        description: 'No title provided'
      }),
      expectedStatus: 400
    },
    {
      name: '8. PUT /api/items/1 (Update Existing Item -> 200)',
      method: 'PUT',
      path: '/api/items/1',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        completed: true,
        title: 'Master Express.js (Updated)'
      }),
      expectedStatus: 200
    },
    {
      name: '9. PUT /api/items/999 (Update Non-Existent Item -> 404)',
      method: 'PUT',
      path: '/api/items/999',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: 'Ghost update'
      }),
      expectedStatus: 404
    },
    {
      name: '10. DELETE /api/items/2 (Delete Existing Item -> 200)',
      method: 'DELETE',
      path: '/api/items/2',
      expectedStatus: 200
    },
    {
      name: '11. DELETE /api/items/999 (Delete Non-Existent Item -> 404)',
      method: 'DELETE',
      path: '/api/items/999',
      expectedStatus: 404
    },
    {
      name: '12. GET /api/unknown-route (Unknown Route -> 404 Catch-All)',
      method: 'GET',
      path: '/api/unknown-route',
      expectedStatus: 404
    }
  ];

  let passedCount = 0;
  let failedCount = 0;

  for (const test of tests) {
    try {
      const url = `${baseUrl}${test.path}`;
      const res = await fetch(url, {
        method: test.method,
        headers: test.headers,
        body: test.body
      });

      const body = await res.json();
      const statusPassed = res.status === test.expectedStatus;

      if (statusPassed) {
        passedCount++;
        console.log(`✅ [PASS] ${test.name}`);
        console.log(`   Status: ${res.status} (Expected: ${test.expectedStatus})`);
        console.log(`   Response: ${JSON.stringify(body)}\n`);
      } else {
        failedCount++;
        console.log(`❌ [FAIL] ${test.name}`);
        console.log(`   Status: ${res.status} (Expected: ${test.expectedStatus})`);
        console.log(`   Response: ${JSON.stringify(body)}\n`);
      }
    } catch (err) {
      failedCount++;
      console.log(`❌ [ERROR] ${test.name}: ${err.message}\n`);
    }
  }

  await new Promise((resolve) => server.close(resolve));

  console.log(`==================================================`);
  console.log(`SUMMARY: ${passedCount} passed, ${failedCount} failed out of ${tests.length} tests.`);
  console.log(`==================================================\n`);

  if (failedCount > 0) {
    process.exit(1);
  }
}

runEndpointChecks().catch((err) => {
  console.error('Fatal error during checks:', err);
  process.exit(1);
});

