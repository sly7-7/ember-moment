import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import moment from 'moment';
import calendar from 'ember-moment/computeds/calendar';
import tz from 'ember-moment/computeds/tz';
import locale from 'ember-moment/computeds/locale';

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';
import { createSubject } from './test-helpers';

module('ember-moment@computed:moment', function (hooks) {
  setupTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('object:empty', EmberObject.extend({}));
    moment.locale('en');
  });

  test('two args (date, referenceDate)', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      date: tz(moment('2013-01-01T02:30:26Z'), 'America/New_York'),
      referenceDate: moment('2013-01-01T12:00:00Z'),
      computedDate: calendar('date', 'referenceDate'),
    });

    assert.equal(subject.get('computedDate'), 'Yesterday at 9:30 PM');
  });

  test('with es locale', function (assert) {
    assert.expect(1);

    const subject = createSubject.call(this, {
      date: tz(
        locale(moment('2013-01-01T08:30:26Z'), 'es'),
        'America/New_York'
      ),
      referenceDate: locale(moment('2013-01-01T12:00:00Z'), 'es'),
      computedDate: calendar('date', 'referenceDate'),
    });

    assert.equal(subject.get('computedDate'), 'hoy a las 3:30');
  });
});
