// OOT significa Object-Oriented Toolkit.
const Oot = {};

Oot.ClassesCache = {};

Oot.createClass = ({ name = false, constructor: callback, dynamic = {}, traits = [] }) => {
  if (name) {
    if (name in Oot.ClassesCache) {
      return Oot.ClassesCache[name];
    }
  }
  const prot = Object.assign({}, dynamic, ...traits, dynamic);
  const inst = Object.create(prot);
  const instanceFactory = (...parameters) => {
    callback.call(inst, ...parameters);
    return inst;
  };
  if (name) {
    Oot.ClassesCache[name] = instanceFactory;
  }
  return instanceFactory;
};

Oot.createInstance = (classDef, parameters = []) => Oot.createClass(classDef)(...parameters);

module.exports = Oot;