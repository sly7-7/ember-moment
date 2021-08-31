import { find, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

let application;

module('Acceptance: Smoke', function (hooks) {
  setupApplicationTest(hooks);

  test('moment', async function (assert) {
    assert.expect(1);
    await visit('/smoke');
    assert.equal(find('.moment-independence-day').textContent, 'Jul 04, 1776');
  });

  test('ago', async function (assert) {
    assert.expect(1);
    await visit('/smoke');
    assert.equal(find('.ago-now').textContent, 'a few seconds ago');
  });

  test('duration', async function (assert) {
    assert.expect(1);
    await visit('/smoke');
    assert.equal(find('.duration-seven-minutes').textContent, '7 minutes');
  });
});
