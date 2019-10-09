const holdMeButton = document.querySelector('#hold-me');
const mouseDown$ = Rx.Observable.fromEvent(holdMeButton, 'mousedown');
const mouseUp$ = Rx.Observable.fromEvent(holdMeButton, 'mouseup');

const holdTime$ = mouseUp$.timestamp().withLatestFrom(mouseDown$.timestamp(), (mouseUpEvent, mouseDownEvent) => {
  console.log(11111, mouseUpEvent, mouseDownEvent)
  const res = mouseUpEvent.timestamp- mouseDownEvent.timestamp;
  document.querySelector('#hold-time').innerText = res;
  return res
});

// holdTime$.subscribe(ms => {
//   console.log(22222, ms)
//   document.querySelector('#hold-time').innerText = ms;
// });

holdTime$.flatMap(ms => Rx.Observable.ajax('https://timing-sense-score-board.herokuapp.com/score/' + ms))
.map(e => {
  console.log(33333, e)
  return e.response
})
.subscribe(res => {
  document.querySelector('#rank').innerText = '你超过了' + res.rank + '% 的用户';
});


