const Hydra = require('hydra-synth')


window.onload = function () {
  const hydra = new Hydra()

  // by default, hydra makes everything global.
  // see options to change parameters
  osc(13,0,1)
  .modulate(osc(21,0.25,0))
  .modulateScale(osc(34))
  .modulateKaleid(osc(55),0.1,1)
  .out()
}
