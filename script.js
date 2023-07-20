import { Field } from "./classes/Field.js";
import { Tile } from "./classes/Tile.js";
const container = document.getElementById("container");
const score = document.getElementById("score");

const field = new Field(container);

field.findEmptyCell().setTile(new Tile(container));
field.findEmptyCell().setTile(new Tile(container));
scoreAndWin();

window.addEventListener("keydown", handleKeyDown);

function handleKeyDown(e) {
  switch (e.key) {
    case "ArrowUp":
      if (!canMoveUp()) return checkFinish();
      moveUp(field.cellsGroupedByColumn);
      addTileToField();

      break;
    case "ArrowDown":
      if (!canMoveDown()) return checkFinish();
      moveDown(field.cellsGroupedByColumnReverse);
      addTileToField();

      break;
    case "ArrowLeft":
      if (!canMoveLeft()) return checkFinish();
      moveLeft(field.cellsGroupedByRow);
      addTileToField();

      break;
    case "ArrowRight":
      if (!canMoveRight()) return checkFinish();
      moveRight(field.cellsGroupedByRowReverse);
      addTileToField();

      break;

    default:
      break;
  }
  scoreAndWin()
}

function checkFinish() {
  scoreAndWin()
  if (!field.findEmptyCell())
    confirm("Game over. You want to repeat?") && window.location.reload();
  else return false;
}

function addTileToField() {
  field.findEmptyCell().setTile(new Tile(container));
}

function moveUp(cellColumns) {
  cellColumns.forEach((cellColumn) => slideTiles(cellColumn));
  field.hasLinkAndMerge();
}

function moveDown(cellColumns) {
  cellColumns.forEach((cellColumn) => slideTiles(cellColumn));
  field.hasLinkAndMerge();
}

function moveLeft(cellColumns) {
  cellColumns.forEach((cellColumn) => slideTiles(cellColumn));
  field.hasLinkAndMerge();
}

function moveRight(cellColumns) {
  cellColumns.forEach((cellColumn) => slideTiles(cellColumn));
  field.hasLinkAndMerge();
}

function slideTiles(cellColumn) {
  for (let i = 1; i < cellColumn.length; i++) {
    if (cellColumn[i].isEmpty()) continue;

    let cellWithTile = cellColumn[i];

    let j = i - 1;
    let selectedPlace;
    while (j >= 0 && cellColumn[j].canAccept(cellWithTile.linkedTile)) {
      selectedPlace = cellColumn[j];
      j--;
    }

    if (!selectedPlace) continue;

    if (selectedPlace.isEmpty()) selectedPlace.setTile(cellWithTile.linkedTile);
    else selectedPlace.setTileForMerge(cellWithTile.linkedTile);

    cellWithTile.removeLinkTile();
  }
}

function scoreAndWin() {
  score.textContent = field.findCellsWithTile();
  if (score.textContent >= 2048)
    confirm("You win, want to repeat?") && window.location.reload();
}

function canMoveUp() {
  return canMove(field.cellsGroupedByColumn);
}

function canMoveDown() {
  return canMove(field.cellsGroupedByColumnReverse);
}

function canMoveLeft() {
  return canMove(field.cellsGroupedByRow);
}

function canMoveRight() {
  return canMove(field.cellsGroupedByRowReverse);
}

function canMove(groupedCells) {
  return groupedCells.some((group) => canMoveInGroup(group));
}

function canMoveInGroup(group) {
  return group.some((cell, index) => {
    if (index === 0) return false;

    if (cell.isEmpty()) return false;

    const targetCell = group[index - 1];
    return targetCell.canAccept(cell.linkedTile);
  });
}
