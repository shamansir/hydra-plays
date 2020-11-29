const Hydra = require('hydra-synth')


window.onload = function () {
    document.body.style.margin = 0;
    document.body.style.background = 'black';

    const hydra = new Hydra()

//   floxdots(()=>a.fft[0]*14.0,2,()=>mouse.x*0.001).out(o0)
//   floxdots().diff(o0).mask(o3).out(o2)
//   smoke(()=>(9*Math.sin(time)+1)).out(o3)

//   render(o0);

  // by default, hydra makes everything global.
  // see options to change parameters

    osc(() => 0.1 + Math.sin(time / 500) * 13,() => Math.sin(time / 500),1)
    .modulate(osc(() => Math.sin(time / 100) * 20,() => Math.min(a.fft[2] / 500,0.5),0.5))
    //.modulate(osc(21,0.25,0))
    .modulateScale(osc(()=>20+Math.min(a.fft[1]*0.05, 15)))
    .modulateKaleid(osc(()=>Math.min(a.fft[0]*0.5,60)),() => 15 - Math.sin(time / 10) * 14,1)
    .out()

}
