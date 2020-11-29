const Hydra = require('hydra-synth')

const midi = require('./midi');


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

    /* osc(() => 0.1 + Math.sin(time / 500) * 13,() => Math.sin(time / 500),1)
    .modulate(osc(() => Math.sin(time / 100) * 20,() => Math.min(a.fft[2] / 500,0.5),0.5))
    //.modulate(osc(21,0.25,0))
    .modulateScale(osc(()=>20+Math.min(a.fft[1]*0.05, 15)))
    .modulateKaleid(osc(()=>Math.min(a.fft[0]*0.5,60)),() => 15 - Math.sin(time / 10) * 14,1)
    .out() */

    // https://hydra.ojack.xyz/?sketch_id=kcTUAk81P2yPnDOj


    //Combined some work of others plus changes
//spin it
//https://twitter.com/LiteralMeaning1

//CNDSD
//http://malitzincortes.net/
// sand spirals

function logValues() {
  console.log(window.values);
}

let lastVals = {};

function bindTo(knobId, scale, def_, min) {
  return function() {
    const vals = window.values;
    if (!vals) { return def_; }
    if (vals.cmd == 11 && vals.type == 176 && vals.note == knobId) {
       // console.log('got it', knobId, vals.velocity * scale);
        let nextVal = 0;
        if ((vals.velocity * scale) > (min || 0)) {
          nextVal = vals.velocity * scale;
        } else {
          nextVal = min || 0;
        }
        lastVals[knobId] = nextVal;
        return nextVal;
    } else {
      if (lastVals.hasOwnProperty(knobId)) {
        //console.log(lastVals[knobId]);
        return lastVals[knobId];
      }
    }
    return def_;
  }
}


osc(3, 0.01, 0.4)
.color(
  bindTo(80, 1/127, 1.2),
  bindTo(81, 1/127, 1.2),
  bindTo(82, 1/127, 1.3)
)
.saturate(0.4)
.modulateRepeat(osc(2),1, 2, 4, 3)
.modulateKaleid(osc(12,0.05,0),1)
.luma (0.4)

.modulate(o0, () => mouse.y *0.0002 )
.scale(1).diff(o1)
.out(o0)

// by Zach Krall
// http://zachkrall.online/

osc(10/*bindTo(83, 10, 10)*/, 0.9, 300)
//.color(0, 0, 0)
.color(
    bindTo(80, 1/127, 0.9),
    bindTo(81, 1/127, 0.7),
    bindTo(82, 1/127, 0.1)
)
.diff(
  osc(bindTo(84, 70/127, 45, 30), 0.3, 100)
  .color(0.9, 0.9, 0.9)
  .rotate(0.18)
  .pixelate(bindTo(83, 12/127, 12, 1))
  .kaleid()
)
.scrollX(4)
.colorama()

.modulate(
  osc(bindTo(85, 100/127, 100))
)
.scale(2)
.out()


}
