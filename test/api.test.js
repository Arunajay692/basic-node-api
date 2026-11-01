import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import app from '../src/app.js';

describe('Express API Endpoints', () => {
  let server;
  let baseUrl;

  before(async () => {
    await new Promise((resolve) => {
      server = app.listen(0, () => {
        const port = server.address().port;
        baseUrl = `http://127.0.0.1:${port}`;
        resolve();
      });
    });
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
  });

  it('GET / should return welcome message and endpoint list', async () => {
    const res = await fetch(`${baseUrl}/`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.message, 'Welcome to the Basic Express API');
    assert.ok(data.endpoints);
  });

  it('GET /api/health should return OK status', async () => {
    const res = await fetch(`${baseUrl}/api/health`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.status, 'OK');
    assert.ok(data.timestamp);
  });

  it('GET /api/items should return list of items', async () => {
    const res = await fetch(`${baseUrl}/api/items`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.ok(Array.isArray(data.data));
    assert.equal(data.total, 2);
  });

  it('POST /api/items should create a new item', async () => {
    const res = await fetch(`${baseUrl}/api/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: 'New Test Item', description: 'Testing POST endpoint' })
    });
    assert.equal(res.status, 201);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.data.title, 'New Test Item');
    assert.equal(data.data.id, 3);
  });

  it('GET /api/items/:id should return single item', async () => {
    const res = await fetch(`${baseUrl}/api/items/3`);
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.data.id, 3);
  });

  it('PUT /api/items/:id should update an existing item', async () => {
    const res = await fetch(`${baseUrl}/api/items/3`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: true })
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.data.completed, true);
  });

  it('DELETE /api/items/:id should delete an item', async () => {
    const res = await fetch(`${baseUrl}/api/items/3`, {
      method: 'DELETE'
    });
    assert.equal(res.status, 200);
    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(data.data.id, 3);
  });

  it('GET /api/unknown-path should return 404', async () => {
    const res = await fetch(`${baseUrl}/api/unknown-path`);
    assert.equal(res.status, 404);
    const data = await res.json();
    assert.equal(data.success, false);
  });
});

