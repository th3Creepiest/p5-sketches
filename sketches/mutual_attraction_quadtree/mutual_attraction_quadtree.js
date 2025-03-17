// Mutual Attraction Quadtree
// The Nature of Code -> by The Coding Train / Daniel Shiffman

let movers = []
let sun
let qtree
let G = 0.35

function setup() {
  createCanvas(500, 500)

  for (let i = 0; i < 350; i++) {
    let pos = p5.Vector.random2D()
    let vel = pos.copy()
    vel.setMag(random(10, 15))
    pos.setMag(random(150, 200))
    vel.rotate(PI / 2)
    let m = random(10, 15)
    movers[i] = new Mover(pos.x, pos.y, vel.x, vel.y, m)
  }
  sun = new Mover(0, 0, 0, 0, 500)
  // movers[0] = new Mover(300, 200, 0, 5, 10);
  // movers[1] = new Mover(100, 200, 0, -5, 10);
  // movers[2] = new Mover(200, 300, -5, 0, 10);
  // movers[3] = new Mover(200, 100, 5, 0, 10);
  background(0)
}

function draw() {
  clear()
  background(0)
  blendMode(ADD)
  let boundary = new Rectangle(0, 0, width, height)
  qtree = QuadTree.create(boundary, 8)

  // Display and move all Things
  for (let m of movers) {
    let point = new Point(m.pos.x, m.pos.y, m)
    qtree.insert(point)
  }

  for (let mover of movers) {
    attract(mover, qtree)

    sun.attract(mover)
    // for (let other of movers) {
    //   if (mover !== other) {
    //     mover.attract(other);
    //     // stroke(255);
    //     // line(mover.pos.x, mover.pos.y, other.pos.x, other.pos.y);
    //   }
    // }
  }

  push()
  translate(width / 2, height / 2)

  for (let mover of movers) {
    mover.update()
    mover.show()
  }

  show(qtree)
  pop()
  //sun.show();
}

function attract(m, qtree) {
  let d = dist(m.pos.x, m.pos.y, qtree.boundary.x, qtree.boundary.y)
  if (d < 25) {
    if (qtree.points) {
      for (let p of qtree.points) {
        if (m != p.userData) {
          p.userData.attract(m)
        }
      }
    }
  } else {
    if (qtree.points) {
      let temp = new Mover(
        qtree.boundary.x,
        qtree.boundary.y,
        0,
        0,
        m.mass * qtree.points.length
      )
      temp.attract(m)
    }
  }

  if (qtree.divided) {
    attract(m, qtree.northeast)
    attract(m, qtree.northwest)
    attract(m, qtree.southeast)
    attract(m, qtree.southwest)
  }
}

function show(qtree) {
  stroke(255)
  noFill()
  strokeWeight(0.25)
  rectMode(CENTER)
  rect(qtree.boundary.x, qtree.boundary.y, qtree.boundary.w, qtree.boundary.h)

  if (qtree.divided) {
    show(qtree.northeast)
    show(qtree.northwest)
    show(qtree.southeast)
    show(qtree.southwest)
  }
}

class Mover {
  constructor(x, y, vx, vy, m) {
    this.pos = createVector(x, y)
    this.vel = createVector(vx, vy)
    this.acc = createVector(0, 0)
    this.mass = m
    this.r = sqrt(this.mass) * 2
  }

  applyForce(force) {
    let f = p5.Vector.div(force, this.mass)
    this.acc.add(f)
  }

  attract(mover) {
    let force = p5.Vector.sub(this.pos, mover.pos)
    let distanceSq = constrain(force.magSq(), 100, 1000)
    let strength = (G * (this.mass * mover.mass)) / distanceSq
    force.setMag(strength)
    mover.applyForce(force)
  }

  update() {
    this.vel.add(this.acc)
    this.pos.add(this.vel)
    this.vel.limit(15)
    this.acc.set(0, 0)
  }

  show() {
    noStroke()
    strokeWeight(8)
    //fill(255, 200);
    //ellipse(this.pos.x, this.pos.y, this.r);
    stroke(255)
    point(this.pos.x, this.pos.y)
  }
}

// QuadTree

class Point {
  constructor(x, y, data) {
    this.x = x
    this.y = y
    this.userData = data
  }

  // Skips Math.sqrt for faster comparisons
  sqDistanceFrom(other) {
    const dx = other.x - this.x
    const dy = other.y - this.y

    return dx * dx + dy * dy
  }

  // Pythagorus: a^2 = b^2 + c^2
  distanceFrom(other) {
    return Math.sqrt(this.sqDistanceFrom(other))
  }
}

class Rectangle {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.left = x - w / 2
    this.right = x + w / 2
    this.top = y - h / 2
    this.bottom = y + h / 2
  }

  contains(point) {
    return (
      this.left <= point.x &&
      point.x <= this.right &&
      this.top <= point.y &&
      point.y <= this.bottom
    )
  }

  intersects(range) {
    return !(
      this.right < range.left ||
      range.right < this.left ||
      this.bottom < range.top ||
      range.bottom < this.top
    )
  }

  subdivide(quadrant) {
    switch (quadrant) {
      case "ne":
        return new Rectangle(
          this.x + this.w / 4,
          this.y - this.h / 4,
          this.w / 2,
          this.h / 2
        )
      case "nw":
        return new Rectangle(
          this.x - this.w / 4,
          this.y - this.h / 4,
          this.w / 2,
          this.h / 2
        )
      case "se":
        return new Rectangle(
          this.x + this.w / 4,
          this.y + this.h / 4,
          this.w / 2,
          this.h / 2
        )
      case "sw":
        return new Rectangle(
          this.x - this.w / 4,
          this.y + this.h / 4,
          this.w / 2,
          this.h / 2
        )
    }
  }

  xDistanceFrom(point) {
    if (this.left <= point.x && point.x <= this.right) {
      return 0
    }

    return Math.min(
      Math.abs(point.x - this.left),
      Math.abs(point.x - this.right)
    )
  }

  yDistanceFrom(point) {
    if (this.top <= point.y && point.y <= this.bottom) {
      return 0
    }

    return Math.min(
      Math.abs(point.y - this.top),
      Math.abs(point.y - this.bottom)
    )
  }

  // Skips Math.sqrt for faster comparisons
  sqDistanceFrom(point) {
    const dx = this.xDistanceFrom(point)
    const dy = this.yDistanceFrom(point)

    return dx * dx + dy * dy
  }

  // Pythagorus: a^2 = b^2 + c^2
  distanceFrom(point) {
    return Math.sqrt(this.sqDistanceFrom(point))
  }
}

// circle class for a circle shaped query
class Circle {
  constructor(x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.rSquared = this.r * this.r
  }

  contains(point) {
    // check if the point is in the circle by checking if the euclidean distance of
    // the point and the center of the circle if smaller or equal to the radius of
    // the circle
    let d = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2)
    return d <= this.rSquared
  }

  intersects(range) {
    let xDist = Math.abs(range.x - this.x)
    let yDist = Math.abs(range.y - this.y)

    // radius of the circle
    let r = this.r

    let w = range.w / 2
    let h = range.h / 2

    let edges = Math.pow(xDist - w, 2) + Math.pow(yDist - h, 2)

    // no intersection
    if (xDist > r + w || yDist > r + h) return false

    // intersection within the circle
    if (xDist <= w || yDist <= h) return true

    // intersection on the edge of the circle
    return edges <= this.rSquared
  }
}

class QuadTree {
  DEFAULT_CAPACITY = 8
  MAX_DEPTH = 8

  constructor(boundary, capacity = this.DEFAULT_CAPACITY, _depth = 0) {
    if (!boundary) {
      throw TypeError("boundary is null or undefined")
    }
    if (!(boundary instanceof Rectangle)) {
      throw TypeError("boundary should be a Rectangle")
    }
    if (typeof capacity !== "number") {
      throw TypeError(`capacity should be a number but is a ${typeof capacity}`)
    }
    if (capacity < 1) {
      throw RangeError("capacity must be greater than 0")
    }

    this.boundary = boundary
    this.capacity = capacity
    this.points = []
    this.divided = false

    this.depth = _depth
  }

  get children() {
    if (this.divided) {
      return [this.northeast, this.northwest, this.southeast, this.southwest]
    } else {
      return []
    }
  }

  static create() {
    if (arguments.length === 0) {
      if (typeof width === "undefined") {
        throw new TypeError("No global width defined")
      }
      if (typeof height === "undefined") {
        throw new TypeError("No global height defined")
      }
      let bounds = new Rectangle(width / 2, height / 2, width, height)
      return new QuadTree(bounds, this.DEFAULT_CAPACITY)
    }
    if (arguments[0] instanceof Rectangle) {
      let capacity = arguments[1] || this.DEFAULT_CAPACITY
      return new QuadTree(arguments[0], capacity)
    }
    if (
      typeof arguments[0] === "number" &&
      typeof arguments[1] === "number" &&
      typeof arguments[2] === "number" &&
      typeof arguments[3] === "number"
    ) {
      let capacity = arguments[4] || this.DEFAULT_CAPACITY
      return new QuadTree(
        new Rectangle(arguments[0], arguments[1], arguments[2], arguments[3]),
        capacity
      )
    }
    throw new TypeError("Invalid parameters")
  }

  toJSON() {
    let obj = {}

    if (this.divided) {
      if (this.northeast.divided || this.northeast.points.length > 0) {
        obj.ne = this.northeast.toJSON()
      }
      if (this.northwest.divided || this.northwest.points.length > 0) {
        obj.nw = this.northwest.toJSON()
      }
      if (this.southeast.divided || this.southeast.points.length > 0) {
        obj.se = this.southeast.toJSON()
      }
      if (this.southwest.divided || this.southwest.points.length > 0) {
        obj.sw = this.southwest.toJSON()
      }
    } else {
      obj.points = this.points
    }

    if (this.depth === 0) {
      obj.capacity = this.capacity
      obj.x = this.boundary.x
      obj.y = this.boundary.y
      obj.w = this.boundary.w
      obj.h = this.boundary.h
    }

    return obj
  }

  static fromJSON(obj, x, y, w, h, capacity, depth) {
    if (typeof x === "undefined") {
      if ("x" in obj) {
        x = obj.x
        y = obj.y
        w = obj.w
        h = obj.h
        capacity = obj.capacity
        depth = 0
      } else {
        throw TypeError("JSON missing boundary information")
      }
    }

    let qt = new QuadTree(new Rectangle(x, y, w, h), capacity, depth)

    qt.points = obj.points ?? null
    qt.divided = qt.points === null // points are set to null on subdivide

    if ("ne" in obj || "nw" in obj || "se" in obj || "sw" in obj) {
      const x = qt.boundary.x
      const y = qt.boundary.y
      const w = qt.boundary.w / 2
      const h = qt.boundary.h / 2

      if ("ne" in obj) {
        qt.northeast = QuadTree.fromJSON(
          obj.ne,
          x + w / 2,
          y - h / 2,
          w,
          h,
          capacity,
          depth + 1
        )
      } else {
        qt.northeast = new QuadTree(
          qt.boundary.subdivide("ne"),
          capacity,
          depth + 1
        )
      }
      if ("nw" in obj) {
        qt.northwest = QuadTree.fromJSON(
          obj.nw,
          x - w / 2,
          y - h / 2,
          w,
          h,
          capacity,
          depth + 1
        )
      } else {
        qt.northwest = new QuadTree(
          qt.boundary.subdivide("nw"),
          capacity,
          depth + 1
        )
      }
      if ("se" in obj) {
        qt.southeast = QuadTree.fromJSON(
          obj.se,
          x + w / 2,
          y + h / 2,
          w,
          h,
          capacity,
          depth + 1
        )
      } else {
        qt.southeast = new QuadTree(
          qt.boundary.subdivide("se"),
          capacity,
          depth + 1
        )
      }
      if ("sw" in obj) {
        qt.southwest = QuadTree.fromJSON(
          obj.sw,
          x - w / 2,
          y + h / 2,
          w,
          h,
          capacity,
          depth + 1
        )
      } else {
        qt.southwest = new QuadTree(
          qt.boundary.subdivide("sw"),
          capacity,
          depth + 1
        )
      }
    }

    return qt
  }

  subdivide() {
    this.northeast = new QuadTree(
      this.boundary.subdivide("ne"),
      this.capacity,
      this.depth + 1
    )
    this.northwest = new QuadTree(
      this.boundary.subdivide("nw"),
      this.capacity,
      this.depth + 1
    )
    this.southeast = new QuadTree(
      this.boundary.subdivide("se"),
      this.capacity,
      this.depth + 1
    )
    this.southwest = new QuadTree(
      this.boundary.subdivide("sw"),
      this.capacity,
      this.depth + 1
    )

    this.divided = true

    // Move points to children.
    // This improves performance by placing points
    // in the smallest available rectangle.
    for (const p of this.points) {
      const inserted =
        this.northeast.insert(p) ||
        this.northwest.insert(p) ||
        this.southeast.insert(p) ||
        this.southwest.insert(p)

      if (!inserted) {
        throw RangeError("capacity must be greater than 0")
      }
    }

    this.points = null
  }

  insert(point) {
    if (!this.boundary.contains(point)) {
      return false
    }

    if (!this.divided) {
      if (this.points.length < this.capacity || this.depth === this.MAX_DEPTH) {
        this.points.push(point)
        return true
      }

      this.subdivide()
    }

    return (
      this.northeast.insert(point) ||
      this.northwest.insert(point) ||
      this.southeast.insert(point) ||
      this.southwest.insert(point)
    )
  }

  query(range, found) {
    if (!found) {
      found = []
    }

    if (!range.intersects(this.boundary)) {
      return found
    }

    if (this.divided) {
      this.northwest.query(range, found)
      this.northeast.query(range, found)
      this.southwest.query(range, found)
      this.southeast.query(range, found)
      return found
    }

    for (const p of this.points) {
      if (range.contains(p)) {
        found.push(p)
      }
    }

    return found
  }

  closest(searchPoint, maxCount = 1, maxDistance = Infinity) {
    if (typeof searchPoint === "undefined") {
      throw TypeError("Method 'closest' needs a point")
    }

    const sqMaxDistance = maxDistance ** 2
    return this.kNearest(searchPoint, maxCount, sqMaxDistance, 0, 0).found
  }

  kNearest(
    searchPoint,
    maxCount,
    sqMaxDistance,
    furthestSqDistance,
    foundSoFar
  ) {
    let found = []

    if (this.divided) {
      this.children
        .sort(
          (a, b) =>
            a.boundary.sqDistanceFrom(searchPoint) -
            b.boundary.sqDistanceFrom(searchPoint)
        )
        .forEach((child) => {
          const sqDistance = child.boundary.sqDistanceFrom(searchPoint)
          if (sqDistance > sqMaxDistance) {
            return
          } else if (foundSoFar < maxCount || sqDistance < furthestSqDistance) {
            const result = child.kNearest(
              searchPoint,
              maxCount,
              sqMaxDistance,
              furthestSqDistance,
              foundSoFar
            )
            const childPoints = result.found
            found = found.concat(childPoints)
            foundSoFar += childPoints.length
            furthestSqDistance = result.furthestSqDistance
          }
        })
    } else {
      this.points
        .sort(
          (a, b) =>
            a.sqDistanceFrom(searchPoint) - b.sqDistanceFrom(searchPoint)
        )
        .forEach((p) => {
          const sqDistance = p.sqDistanceFrom(searchPoint)
          if (sqDistance > sqMaxDistance) {
            return
          } else if (foundSoFar < maxCount || sqDistance < furthestSqDistance) {
            found.push(p)
            furthestSqDistance = Math.max(sqDistance, furthestSqDistance)
            foundSoFar++
          }
        })
    }

    return {
      found: found
        .sort(
          (a, b) =>
            a.sqDistanceFrom(searchPoint) - b.sqDistanceFrom(searchPoint)
        )
        .slice(0, maxCount),
      furthestSqDistance: Math.sqrt(furthestSqDistance),
    }
  }

  forEach(fn) {
    if (this.divided) {
      this.northeast.forEach(fn)
      this.northwest.forEach(fn)
      this.southeast.forEach(fn)
      this.southwest.forEach(fn)
    } else {
      this.points.forEach(fn)
    }
  }

  merge(other, capacity) {
    let left = Math.min(this.boundary.left, other.boundary.left)
    let right = Math.max(this.boundary.right, other.boundary.right)
    let top = Math.min(this.boundary.top, other.boundary.top)
    let bottom = Math.max(this.boundary.bottom, other.boundary.bottom)

    let height = bottom - top
    let width = right - left

    let midX = left + width / 2
    let midY = top + height / 2

    let boundary = new Rectangle(midX, midY, width, height)
    let result = new QuadTree(boundary, capacity)

    this.forEach((point) => result.insert(point))
    other.forEach((point) => result.insert(point))

    return result
  }

  get length() {
    if (this.divided) {
      return (
        this.northwest.length +
        this.northeast.length +
        this.southwest.length +
        this.southeast.length
      )
    }

    return this.points.length
  }
}

if (typeof module !== "undefined") {
  module.exports = { Point, Rectangle, QuadTree, Circle }
}
