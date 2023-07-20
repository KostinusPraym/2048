export class Cell {
  constructor(container, x, y) {
    this.cell = document.createElement("div");
    this.cell.classList.add("cell");
    container.append(this.cell);
    this.x = x;
    this.y = y;
  }

  isEmpty() {
    return !this.linkedTile;
  }

  setTile(tile) {
    tile.setXY(this.x, this.y);
    this.linkedTile = tile;
  }

  hasLinkedTileForMerge() {
    return !!this.linkedTileForMerge;
  }
  
  unlinkTileFromMerge(){
    this.linkedTileForMerge = null
  }

  setTileForMerge(tile) {
    tile.setXY(this.x, this.y);
    this.linkedTileForMerge = tile;
  }

  canAccept(newTile) {
    return (
      this.isEmpty() ||
      (!this.hasLinkedTileForMerge() && this.linkedTile.value === newTile.value)
    );
  }

  removeLinkTile() {
    this.linkedTile = null;
  }

  mergeTiles() {
    this.linkedTile.setValue( this.linkedTileForMerge.value + this.linkedTile.value);
    this.linkedTileForMerge.removeDOM()
    this.unlinkTileFromMerge() 
  }
}
