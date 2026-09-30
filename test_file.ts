function predictPartyVictory(senate: string): string {
  const r: number[] = [];
  const d: number[] = [];

  for (let i = 0; i < senate.length; i++) {
    if (senate.charAt(i) === 'R') r.push(i);
    else d.push(i);
  }

  let rI: number = 0;
  let dI: number = 0;

  while (r[rI] < r.length && d[dI] < d.length) {
    let rTop: number = r[rI];
    let dTop: number = d[dI];

    rI++;
    dI++;

    if (rTop < dTop) r.push(rTop + senate.length);
    else d.push(dTop + senate.length);
  }

  return rI < r.length ? 'Radiant' : 'Dire';
}
