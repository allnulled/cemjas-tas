const Skillset1 = {
    andar() { return "anda" },
    mirar() { return "mira" },
    hablar() { return "habla" },
};

const Skillset2 = {
    andar() { return "anda y corre" },
    saltar() { return "salta" },
};

const i1 = Pak.require("src/cem/oop/Oot.js").createInstance({
  constructor() {},
  traits: [Skillset1, Skillset2],
  dynamic: {
    andar() { return "Nop" }
  }
});

console.log(i1);
console.log(i1.andar);
console.log(i1.hablar()); // habla
console.log(i1.saltar()); // salta
console.log(i1.andar());  // Nop