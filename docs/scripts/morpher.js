const morpher = function(start, end, change_elem_f) {
  const chars = [...new Set(start.split("").concat(end.split()))];
  const duration = 4;
  const frameRate = 30;
  let string = start.split("");
  const result = end.split("");
  const slen = string.length;
  const rlen = result.length;
  let present = new Date;
  let past = present.getTime();
  let count = 0;
  let spentTime = 0;
  let splitTime = duration * 70 / Math.max(slen, rlen);

  function update() {
    present = new Date;
    spentTime += present.getTime() - past;
    for (let i = count; i < Math.max(slen, rlen); i++) {
      const random = Math.floor(Math.random() * (chars.length - 1));
      string[i] = chars[random]
    }
    if (spentTime >= splitTime) {
      count += Math.floor(spentTime / splitTime);
      for (let j = 0; j < count; j++) {
        string[j] = result[j] || null
      }
      spentTime = 0
    }
    change_elem_f(string.join(""));
    past = present.getTime();
    if (count < Math.max(slen, rlen)) {
      morphTimeout = setTimeout((() => {
        window.requestAnimationFrame(update)
      }), 1e3 / frameRate)
    }
  }
  update()
};