import moment from 'moment';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

// module('Integration | Component | moment', function (hooks) {
//   setupRenderingTest(hooks);

//   test('it renders', async function (assert) {
//     // Set any properties with this.set('myProperty', 'value');
//     // Handle any actions with this.set('myAction', function(val) { ... });

//     await render(hbs`<Moment />`);

//     assert.dom(this.element).hasText('');

//     // Template block usage:
//     await render(hbs`
//       <Moment>
//         template block text
//       </Moment>
//     `);

//     assert.dom(this.element).hasText('template block text');
//   });
// });

module('Integration | Component | moment', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.service = this.owner.lookup('service:moment');
    this.service.changeLocale('en');
  });

  test('moment-from and moment integration', async function (assert) {
    assert.expect(1);

    this.set('tomorrow', moment().add(1, 'day'));
    await render(hbs`{{moment-from (moment) tomorrow}}`);

    assert.equal(this.element.textContent, 'a day ago');
  });

  test('moment-from and moment integration', async function (assert) {
    assert.expect(1);

    this.set('tomorrow', moment().add(1, 'day'));
    await render(hbs`{{moment-to (moment) tomorrow}}`);

    assert.equal(this.element.textContent, 'in a day');
  });

  test('moment and monent-format helper integration #2', async function (assert) {
    assert.expect(1);

    this.setProperties({
      inputFormat: 'M/D/YY',
      outputFormat: 'MMMM D, YYYY',
      date: '5/3/10',
    });

    await render(hbs`{{moment-format (moment date inputFormat) outputFormat}}`);
    assert.equal(this.element.textContent, 'May 3, 2010');
  });

  test('moment can use the service locale', async function (assert) {
    assert.expect(1);

    this.setProperties({
      inputFormat: 'M/D/YY',
      outputFormat: 'MMMM D, YYYY',
      date: '5/3/10',
    });

    this.service.changeLocale('fr');
    await render(hbs`{{moment-format (moment date inputFormat) outputFormat}}`);

    assert.equal(this.element.textContent, 'mai 3, 2010');
  });

  test('changing moment service locale changes global locale', async function (assert) {
    const done = assert.async();
    assert.expect(1);

    this.service.on('localeChanged', function () {
      assert.equal(moment.locale(), 'es');
      done();
    });

    this.service.setLocale('es');
  });

  test('changing timeZone triggers event', async function (assert) {
    const done = assert.async();
    assert.expect(1);

    this.service.on('timeZoneChanged', function () {
      assert.ok(true);
      done();
    });

    this.service.setTimeZone('PST');
  });

  test('moment can use the service locale (setLocale)', async function (assert) {
    assert.expect(1);

    this.setProperties({
      inputFormat: 'M/D/YY',
      outputFormat: 'MMMM D, YYYY',
      date: '5/3/10',
    });

    this.service.setLocale('fr');
    await render(hbs`{{moment-format (moment date inputFormat) outputFormat}}`);

    assert.equal(this.element.textContent, 'mai 3, 2010');
  });

  test('moment can update service locale (updateLocale)', async function (assert) {
    assert.expect(2);

    this.service.updateLocale('en', { week: { dow: 3 } });
    assert.equal(moment().weekday(0).format('dddd'), 'Wednesday');
    this.service.updateLocale('en', { week: { dow: 0 } });
    assert.equal(moment().weekday(0).format('dddd'), 'Sunday');
  });
});
