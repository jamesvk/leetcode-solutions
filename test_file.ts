function asteroidCollision(asteroids: number[]): number[] {
  let ans: number[] = [];

  for (const a of asteroids) {
    let alive: boolean = true;
    let top = ans[ans.length - 1];

    while (alive && ans.length && top > 0 && a < 0) {
      if (top < -a) {
        ans.pop();
        top = ans[ans.length - 1];
      } else if (top === -a) {
        ans.pop();
        top = ans[ans.length - 1];
        alive = false;
      } else {
        alive = false;
      }
    }

    if (alive) ans.push(a);
  }

  return ans;
}

[3, 5, -6, 2, -1, 4];
