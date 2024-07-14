// box
Box = class {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.c = createVector(x + w * 0.5, y + h * 0.5);
        this.tl = createVector(x, y);
        this.tr = createVector(x + w, y);
        this.br = createVector(x + w, y + h);
        this.bl = createVector(x, y + h);
        this.tc = createVector(x + w * 0.5, y);
        this.rc = createVector(x + w, y + h * 0.5);
        this.bc = createVector(x + w * 0.5, y + h);
        this.lc = createVector(x, y + h * 0.5);
    }
    gridify(gridWidth, gridHeight) {
        let grid = [];
        let boxWidth = this.w / gridWidth;
        let boxHeight = this.h / gridHeight;

        for (let i = 0; i < gridWidth; i++) {
            grid.push([]);
            for (let j = 0; j < gridHeight; j++) {
                grid[i].push(
                    new Box(
                        this.x + boxWidth * i,
                        this.y + boxHeight * j,
                        boxWidth,
                        boxHeight
                    )
                );
            }
        }
        return grid;
    }
    randomPoint() {
        return createVector(
            this.x + random() * this.w,
            this.y + random() * this.h
        );
    }

    coords(xRatio, yRatio) {
        return [this.xc(xRatio), this.yc(yRatio)];
    }

    xc(ratio) {
        return this.x + this.w * ratio;
    }

    yc(ratio) {
        return this.y + this.h * ratio;
    }

    mirrorH() {
        let img = pg.get(this.x, this.y, this.w, this.h);
        pg.push();
        pg.scale(-1, 1);
        pg.translate(-(2 * this.x + this.w), 0);
        pg.image(img, this.x, this.y, this.w, this.h);
        pg.pop();
    }

    mirrorV() {
        let img = pg.get(this.x, this.y, this.w, this.h);
        pg.push();
        pg.scale(1, -1);
        pg.translate(0, -(2 * this.y + this.h));
        pg.image(img, this.x, this.y, this.w, this.h);
        pg.pop();
    }

    rotate(rotation) {
        let img = pg.get(this.x, this.y, this.w, this.h);
        pg.push();
        pg.translate(this.c.x, this.c.y);
        pg.rotate(rotation * PI * 0.5);
        pg.translate(-this.c.x, -this.c.y);
        pg.image(img, this.x, this.y, this.w, this.h);
        pg.pop();
    }

    rect() {
        pg.rect(this.x, this.y, this.w, this.h);
    }

    area() {
        return this.w * this.h;
    }

    triangle2(oriantation) {
        switch (oriantation) {
            case "tl":
                vecTriangle(this.tl, this.tr, this.bl);
                break;
            case "tr":
                vecTriangle(this.tl, this.tr, this.br);
                break;
            case "br":
                vecTriangle(this.br, this.tr, this.bl);
                break;
            case "bl":
                vecTriangle(this.bl, this.tl, this.br);
                break;
        }
    }

    triangle4(oriantation) {
        switch (oriantation) {
            case "l":
                vecTriangle(this.tl, this.bl, this.c);
                break;
            case "t":
                vecTriangle(this.tl, this.tr, this.c);
                break;
            case "r":
                vecTriangle(this.tr, this.br, this.c);
                break;
            case "b":
                vecTriangle(this.bl, this.br, this.c);
                break;
        }
    }

    circle(r) {
        pg.circle(this.c.x, this.c.y, r * Math.min(this.w, this.h));
    }

    subBox(ratio) {
        const ratio2 = (1 - ratio) * 0.5;
        return new Box(
            this.x + ratio2 * this.w,
            this.y + ratio2 * this.h,
            ratio * this.w,
            ratio * this.h
        );
    }

    subBoxRect() {
        if (this.w > this.h) {
            const diff = this.w - this.h;
            return new Box(this.x + diff * 0.5, this.y, this.w - diff, this.h);
        } else {
            const diff = this.h - this.w;
            return new Box(this.x, this.y + diff * 0.5, this.w, this.h - diff);
        }
    }
};

function vecTriangle(a, b, c) {
    pg.triangle(a.x, a.y, b.x, b.y, c.x, c.y);
}

// gradients
function getBoxGradient(b, x1r, y1r, x2r, y2r, steps) {
    let [x1, y1] = b.coords(x1r, y1r);
    let [x2, y2] = b.coords(x2r, y2r);
    return getGradient(x1, y1, x2, y2, steps);
}

function getGradient(x1, y1, x2, y2, steps) {
    gradient = pg.drawingContext.createLinearGradient(x1, y1, x2, y2);

    s = 1 / (steps.length - 1);
    for (let i = 0; i < steps.length; i++) {
        gradient.addColorStop(i * s, steps[i]);
    }

    return gradient;
}

function fillGradient(g) {
    pg.drawingContext.fillStyle = g;
}

function strokeGradient(g) {
    pg.drawingContext.strokeStyle = g;
}
