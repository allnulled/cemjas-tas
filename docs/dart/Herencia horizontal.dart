mixin Flyer {
  void fly() => print('Flying');
}

mixin Swimmer {
  void swim() => print('Swimming');
}

class Bird with Flyer {}
class Fish with Swimmer {}
class Duck with Flyer, Swimmer {} // Horizontal reuse
Duck d = Duck();
main() {
  d = Duck();
  d.fly();
  d.swim();
}