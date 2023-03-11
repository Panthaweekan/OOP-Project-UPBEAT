$(() => {
    const $canvas = $("canvas");
    const $msg = $("#msg");
    const bounds = {
      width: window.innerWidth,
      height: window.innerHeight };
  
  
    const oneDeg = Math.PI / 180;
    const margin = 5;
    const sqrt3 = Math.sqrt(3);
    const radius = Math.min(bounds.width, bounds.height) / 20;
    const xHexSize = radius * sqrt3;
    const yHexSize = radius * 2;
    const vHex = radius / 2;
    const hHex = radius * Math.cos(30 * oneDeg);
  
    function lerp(a, b, t) {
      return a + (b - a) * t;
    }
  
    class Point {
      constructor(x, y, z) {
        if (typeof x === "object") {
          if (x.constuctor && x.constructor.name === "Array") {
            this.x = x[0] || 0;
            this.y = y[1] || 0;
            this.z = z[2] || 0;
          } else {
            this.x = x.x || 0;
            this.y = x.y || 0;
            this.z = x.z || 0;
          }
        } else {
          this.x = x || 0;
          this.y = y || 0;
          this.z = z || 0;
        }
      }
      add(p) {
        if (typeof p === "number") {
          return new Point(this.x + p, this.y + p, this.z + p);
        }
        return new Point(this.x + p.x, this.y + p.y, this.z + p.z);
      }
      sub(p) {
        if (typeof p === "number") {
          return new Point(this.x - p, this.y - p, this.z - p);
        }
        return new Point(this.x - p.x, this.y - p.y, this.z - p.z);
      }
      mul(p) {
        if (typeof p === "number") {
          return new Point(this.x * p, this.y * p, this.z * p);
        }
        return new Point(this.x * p.x, this.y * p.y, this.z * p.z);
      }
      round() {
        return new Point(
        Math.round(this.x),
        Math.round(this.y),
        Math.round(this.z));
  
      }
      floor() {
        return new Point(
        Math.floor(this.x),
        Math.floor(this.y),
        Math.floor(this.z));
  
      }
      ceil() {
        return new Point(Math.ceil(this.x), Math.ceil(this.y), Math.ceil(this.z));
      }
      lerp(p, t) {
        return new Point(
        lerp(this.x, p.x, t),
        lerp(this.y, p.y, t),
        lerp(this.z, p.z, t));
  
      }
      equals(p) {
        return this.x === p.x && this.y === p.y && this.z === p.z;
      }
      hexLength() {
        return Math.round(
        (Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)) / 2);
  
      }
      hexDistance(h) {
        return this.hexLength(this.sub(h));
      }}
  
  
    const mouse = new Point();
    let board;
  
    $(window).
    resize(() => {
      bounds.width = window.innerWidth;
      bounds.height = window.innerHeight;
      $canvas.attr(bounds);
    }).
    resize().
    mousemove(e => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    });
    const clock = {
      start: 0,
      time: 0,
      delta: 0,
      fpsc: 0,
      fps: 0 };
  
    setInterval(() => {
      clock.fps = clock.fpsc;
      clock.fpsc = 0;
      $msg.text(`FPS: ${clock.fps}  Mouse: ${mouse.x},${mouse.y}`);
    }, 1000);
  
    function animate() {
      if (!clock.time) clock.time = Date.now();
      clock.delta = (Date.now() - clock.time) / 1000;
      clock.delta = Math.min(0.1, Math.max(0.001, clock.delta));
      clock.time = Date.now();
      if (!clock.start) {
        clock.start = clock.time;
      }
      const ctx = $canvas[0].getContext("2d");
      update(clock, ctx);
      draw(clock, ctx);
      clock.fpsc++;
      requestAnimationFrame(animate);
    }
    function hex_round(hex) {
      return cube_to_axial(cube_round(axial_to_cube(hex)));
    }
    function oddr_round(oddr) {
      return cube_to_oddr(cube_round(oddr_to_cube(oddr)));
    }
  
    function cube_to_axial(cube) {
      const q = cube.x;
      const r = cube.z;
      return new Point(q, r);
    }
    function axial_to_cube(hex) {
      const x = hex.x;
      const z = hex.y;
      const y = -x - z;
      return new Point(x, y, z);
    }
    function cube_to_oddr(cube) {
      const col = cube.x + (cube.z - (cube.z & 1)) / 2;
      const row = cube.z;
      return new Point(col, row);
    }
    function oddr_to_cube(hex) {
      const x = hex.x - (hex.y - (hex.y & 1)) / 2;
      const z = hex.y;
      const y = -x - z;
      return new Point(x, y, z);
    }
    const oddr_directions = [
    [[+1, 0], [0, -1], [-1, -1], [-1, 0], [-1, +1], [0, +1]],
    [[+1, 0], [+1, -1], [0, -1], [-1, 0], [0, +1], [+1, +1]]];
  
    const axial_directions = [
    new Point(+1, 0),
    new Point(+1, -1),
    new Point(0, -1),
    new Point(-1, 0),
    new Point(-1, +1),
    new Point(0, +1)];
  
    const cubeDirections = [
    new Point(+1, -1, 0),
    new Point(+1, 0, -1),
    new Point(0, +1, -1),
    new Point(-1, +1, 0),
    new Point(-1, 0, +1),
    new Point(0, -1, +1)];
  
    const cube_diagonals = [
    new Point(+2, -1, -1),
    new Point(+1, +1, -2),
    new Point(-1, +2, -1),
    new Point(-2, +1, +1),
    new Point(-1, -1, +2),
    new Point(+1, -2, +1)];
  
    function cube_round(cube) {
      let rx = Math.round(cube.x);
      let ry = Math.round(cube.y);
      let rz = Math.round(cube.z);
  
      const x_diff = Math.abs(rx - cube.x);
      const y_diff = Math.abs(ry - cube.y);
      const z_diff = Math.abs(rz - cube.z);
  
      if (x_diff > y_diff && x_diff > z_diff) {
        rx = -ry - rz;
      } else if (y_diff > z_diff) {
        ry = -rx - rz;
      } else {
        rz = -rx - ry;
      }
  
      return new Point(rx, ry, rz);
    }
    function cube_diagonal_neighbor(cube, direction) {
      return cube.add(cube_diagonals[direction]);
    }
    function cube_neighbor(cube, direction) {
      return cube.add(cube_direction(direction));
    }
    function cube_distance(a, b) {
      return (
        (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z)) / 2);
  
    }
    function cube_lerp(a, b, t) {
      return new Point(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t));
    }
    function cube_linedraw(a, b) {
      const N = cube_distance(a, b);
      const results = [];
      for (let i = 0; i <= N; i++) {
        results.push(cube_round(cube_lerp(a, b, 1.0 / N * i)));
      }
      return results;
    }
    function hex_neighbor(hex, direction) {
      return hex.add(hex_direction(direction));
    }
    function hex_distance(a, b) {
      const ac = axial_to_cube(a);
      const bc = axial_to_cube(b);
      return cube_distance(ac, bc);
    }
    function offset_distance(a, b) {
      const ac = offset_to_cube(a);
      const bc = offset_to_cube(b);
      return cube_distance(ac, bc);
    }
    function oddr_offset_neighbor(hex, direction) {
      const parity = hex.y & 1;
      const dir = oddr_directions[parity][direction];
      return new Point(hex.x + dir[0], hex.y + dir[1]);
    }
    function tilesInRange(center, N) {
      const results = [];
      for (let x = -N; x <= +N; x++) {
        for (let y = Math.max(-N, -x - N); y <= Math.min(+N, -x + N); y++) {
          const z = -x - y;
          results.push(center.add(new Point(x, y, z)));
        }
      }
      return results;
    }
    function oddr_offset_to_pixel(hex, size) {
      const x = size * sqrt3 * (hex.x + 0.5 * (hex.y & 1));
      const y = size * 3 / 2 * hex.y;
      return new Point(x, y);
    }
    function pixel_to_pointy_oddr(point, size) {
      let x = (point.x - xHexSize / 2) / xHexSize;
      const t1 = point.y / radius,
      t2 = Math.floor(x + t1);
      const r = Math.floor((Math.floor(t1 - x) + t2) / 3);
      const q = Math.floor((Math.floor(2 * x + 1) + t2) / 3) - r;
      return cube_to_oddr(cube_round(new Point(q, -q - r, r)));
    }
  
    function pointy_hex_to_pixel(hex, size) {
      const x = size * (sqrt3 * hex.x + sqrt3 / 2 * hex.y);
      const y = size * (3 / 2 * hex.y);
      return new Point(x, y);
    }
    function pixel_to_pointy_hex(point, size) {
      let x = (point.x - xHexSize / 2) / xHexSize;
      const t1 = point.y / radius,
      t2 = Math.floor(x + t1);
      const r = Math.floor((Math.floor(t1 - x) + t2) / 3);
      const q = Math.floor((Math.floor(2 * x + 1) + t2) / 3) - r;
      return hex_round(new Point(q, r));
    }
    function pointyHexCorner(center, size, i) {
      const angle_deg = 60 * i - 30;
      const angle_rad = oneDeg * angle_deg;
      return new Point(
      center.x + size * Math.cos(angle_rad),
      center.y + size * Math.sin(angle_rad));
  
    }
  
    class Hex {
      constructor(opts) {
        this.board = opts.board;
        this.pos = opts.pos;
        this.coords = opts.coords;
        this.hexCoords = opts.hexCoords;
        this.cubeCoords = opts.cubeCoords;
        this.fillStyle = opts.fillStyle || "";
        this.strokeStyle = opts.strokeStyle || "#AAA";
        this.lineWidth = opts.lineWidth || 1;
        this.mouseOver = false;
        this.highlight = false;
        this.points = [];
        for (let i = 0; i <= 6; i++) {
          this.points.push(pointyHexCorner(this.pos, opts.size, i));
        }
      }
      draw(ctx, opts = {}) {
        let a, x, y, i, l;
  
        ctx.lineWidth = opts.lineWidth || this.lineWidth;
        this.mouseOver = this.poinInside(mouse);
  
        ctx.beginPath();
        for (i = 0, l = this.points.length; i < l; i++) {
          if (i === 0) {
            ctx.moveTo(this.points[i].x, this.points[i].y);
          } else {
            ctx.lineTo(this.points[i].x, this.points[i].y);
          }
        }
        let fs = opts.fillStyle || this.fillStyle;
        let ss = opts.strokeStyle || this.strokeStyle;
        if (this.mouseOver || this.highlight) {
          ss = "#FFF";
          ctx.lineWidth = 3;
        }
  
        if (fs) {
          ctx.fillStyle = fs;
          ctx.fill();
        }
        if (ss) {
          ctx.strokeStyle = ss;
          ctx.stroke();
        }
        ctx.font = "15px serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#FFF";
        ctx.fillText(
        `${Math.round(this.coords.x)},${Math.round(this.coords.y)}`,
        this.pos.x,
        this.pos.y - 16);
  
        ctx.fillText(
        `${Math.round(this.hexCoords.x)},${Math.round(this.hexCoords.y)}`,
        this.pos.x,
        this.pos.y + 16);
  
        ctx.fillText(
        `${Math.round(this.cubeCoords.x)},${Math.round(
        this.cubeCoords.y)
        },${Math.round(this.cubeCoords.z)}`,
        this.pos.x,
        this.pos.y);
  
      }
      poinInside(pos) {
        return pointInsideHex(pos, this.pos);
      }}
  
    class Board {
      constructor(opts = {}) {
        this.opts = { xHexes: 10, yHexes: 10, ...opts };
        this.grid = new Array(this.opts.yHexes);
        for (let y = 0; y < this.grid.length; y++) {
          this.grid[y] = new Array(this.opts.xHexes);
        }
        this.hexes = [];
        this.hexUnderMouse = null;
        this.build();
        $canvas.on("click", this.click.bind(this));
        this.filterCoordsToBounds = this.filterCoordsToBounds.bind(this);
      }
      click(evt) {
        this.clearHighlight();
        const t = pixel_to_pointy_oddr(
        mouse.sub(new Point(this.opts.margin, this.opts.margin)),
        radius);
  
        if (this.filterCoordsToBounds(t)) {
          // this.grid[t.y][t.x].highlight=true;
          this.highlightRadius(this.hexUnderMouse.coords, 1);
        }
  
        if (this.hexUnderMouse) {
          // this.hexUnderMouse.highlight = !this.hexUnderMouse.highlight;
          // this.highlightRadius(this.hexUnderMouse.coords, 1);
        }
      }
      build() {
        //length of line
        let xGrid, yGrid, x, y, shiftX, hex;
  
        //loop through hex "rows" and every other row shift
        for (yGrid = 0; yGrid < this.opts.yHexes; yGrid++) {
          for (xGrid = 0; xGrid < this.opts.xHexes; xGrid++) {
            if (yGrid % 2 !== 0) {
              //even row
              shiftX = xHexSize / 2;
            } else {
              //odd row
              shiftX = 0;
            }
            x = xGrid * xHexSize + shiftX + radius + this.opts.margin;
            y = yGrid * yHexSize * 0.75 + radius + this.opts.margin;
  
            hex = new Hex({
              board: this,
              pos: new Point(x, y),
              size: radius,
              coords: new Point(xGrid, yGrid),
              hexCoords: new Point(xGrid - Math.floor(yGrid / 2), yGrid),
              cubeCoords: oddr_to_cube(new Point(xGrid, yGrid)) });
  
            this.grid[yGrid][xGrid] = hex;
            this.hexes.push(hex);
          }
        }
      }
      filterCoordsToBounds(t) {
        return (
          t.x >= 0 &&
          t.y >= 0 &&
          t.y < this.grid.length &&
          t.x < this.grid[t.y].length);
  
      }
      highlightRadius(pos, r) {
        tilesInRange(oddr_to_cube(this.hexUnderMouse.coords), r).
        map(cube => cube_to_oddr(cube)).
        filter(this.filterCoordsToBounds).
        forEach(tile => {
          this.grid[tile.y][tile.x].highlight = true;
        });
      }
      clearHighlight() {
        this.hexes.forEach(h => h.highlight = false);
      }
      draw(ctx) {
        let x, l;
        this.hexUnderMouse = null;
        for (x = 0, l = this.hexes.length; x < l; x++) {
          this.hexes[x].draw(ctx);
          if (!this.hexUnderMouse && this.hexes[x].mouseOver) {
            this.hexUnderMouse = this.hexes[x];
          }
        }
        if (this.hexUnderMouse) {
          this.hexUnderMouse.draw(ctx);
        }
      }}
  
    function pointInsideHex(pos, center) {
      // transform the test point locally and to quadrant 2
      const q2x = Math.abs(pos.x - center.x);
      // transform the test point locally and to quadrant 2
      const q2y = Math.abs(pos.y - center.y);
  
      // bounding test (since q2 is in quadrant 2 only 2 tests are needed)
      if (q2x > hHex || q2y > vHex * 2) return false;
      // finally the dot product can be reduced to this due to the hexagon symmetry
      return 2 * vHex * hHex - vHex * q2x - hHex * q2y >= 0;
    }
  
    function update(clock, ctx) {}
  
    function draw(clock, ctx) {
      ctx.clearRect(0, 0, bounds.width, bounds.height);
      board.draw(ctx);
    }
  
    function init() {
      board = new Board({ margin: 5 });
    }
    init();
    requestAnimationFrame(animate);
    
  });