export class Tile {
  constructor(container) {
    this.tile = document.createElement("div");
    this.tile.classList.add("tile");
    this.setValue(Math.random() > 0.5 ? 2 : 4);
    container.append(this.tile);
  }

  setValue(value) {
    this.value = value;
    this.tile.textContent = this.value;
    const bgLightness = 100 - Math.log2(value) * 9;
    this.tile.style.setProperty("--bg-lightness", `${bgLightness}%`);
    this.tile.style.setProperty(
      "--text-lightness",
      `${bgLightness > 50 ? 10 : 90}%`
    );
  }

  setXY(x, y) {
    this.tile.style.setProperty("--x", x);
    this.tile.style.setProperty("--y", y);
  }

  removeDOM() {
    this.tile.remove()
  }
}
