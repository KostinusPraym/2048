import { Cell } from "./Cell.js";

const _rowsLength = 4;
const fieldWidth = _rowsLength * _rowsLength;

export class Field {
  constructor(container) {
    this.cells = [];
    for (let i = 0; i < fieldWidth; i++) {
      this.cells.push(
        new Cell(container, i % _rowsLength, Math.floor(i / _rowsLength))
      );
    }
    this.cellsGroupedByColumn = this.setCellColumn();
    this.cellsGroupedByColumnReverse = this.cellsGroupedByColumn.map(column => [...column].reverse());
    this.cellsGroupedByRow = this.setCellRow()
    this.cellsGroupedByRowReverse = this.cellsGroupedByRow.map(row => [...row].reverse());
  }

  findEmptyCell() {
    const emptyCells = this.cells.filter((cell) => cell.isEmpty());
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }

  setCellColumn() {
    return this.cells.reduce((initialArr, cell) => {
      initialArr[cell.x] = initialArr[cell.x] || [];
      initialArr[cell.x][cell.y] = cell;
      return initialArr;
    }, []);
  }

  setCellRow() {
    return this.cells.reduce((initialArr, cell) => {
      initialArr[cell.x] = initialArr[cell.x] || [];
      initialArr[cell.y][cell.x] = cell;
      return initialArr;
    }, []);
  }

  hasLinkAndMerge() {
    this.cells.forEach((cell) => {
      cell.hasLinkedTileForMerge() && cell.mergeTiles();
    });
  }

  findCellsWithTile() {
    const withTile = this.cells.filter((cell) => !cell.isEmpty());
    return withTile.reduce(
      (prev, cellWithTile) => prev + cellWithTile.linkedTile.value,
      0
    );
  }
}
