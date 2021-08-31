export function createSubject(attrs) {
  const factory = this.owner.factoryFor('object:empty').class.extend(attrs);
  return factory.create();
}
