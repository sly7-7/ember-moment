import EmberObject from '@ember/object';
import { getOwner } from '@ember/application';
import $ from 'jquery';
import moment from 'moment';
import { moduleFor, test } from 'ember-qunit';
import duration from 'ember-moment/computeds/duration';
import humanize from 'ember-moment/computeds/humanize';
import locale from 'ember-moment/computeds/locale';

moduleFor('ember-moment@computed:duration', {
  setup() {
    this.register('object:empty', EmberObject.extend({}));
    moment.locale('en');
  },
});

function createSubject(attrs) {
  return getOwner(this)
    .resolveRegistration('object:empty')
    .extend(
      $.extend(attrs, {
        container: this.container,
        registry: this.registry,
      })
    )
    .create();
}

test('get and set (ms)', function (assert) {
  assert.expect(2);

  const subject = createSubject.call(this, {
    ms: 5000,
    duration: humanize(duration('ms')),
  });

  assert.equal(subject.get('duration'), 'a few seconds');
  subject.set('ms', 10800000);
  assert.equal(subject.get('duration'), '3 hours');
});

test('computed composition using locale and humanize', function (assert) {
  assert.expect(2);

  const subject = createSubject.call(this, {
    ms: 5000,
    duration: humanize(locale(duration('ms'), 'es')),
  });

  assert.equal(subject.get('duration'), 'unos segundos');
  subject.set('ms', 10800000);
  assert.equal(subject.get('duration'), '3 horas');
});

test('get and set (days)', function (assert) {
  assert.expect(2);

  const subject = createSubject.call(this, {
    numDays: 4,
    duration: humanize(duration('numDays', 'days')),
  });

  assert.equal(subject.get('duration'), '4 days');
  subject.set('numDays', 1);
  assert.equal(subject.get('duration'), 'a day');
});

test('get literal (ms)', function (assert) {
  assert.expect(1);

  const subject = createSubject.call(this, {
    duration: humanize(duration(5000)),
  });

  assert.equal(subject.get('duration'), 'a few seconds');
});
