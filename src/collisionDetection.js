export function detectCollision(stone, gameObject) {
  let bottomOfStone = stone.position.y + stone.size;
  let topOfStone = stone.position.y;

  let topOfGameObject = gameObject.position.y;
  let leftSideOfGameObject = gameObject.position.x;
  let rightSideOfGameObject = gameObject.position.x + gameObject.width;
  let bottomOfObject = gameObject.position.y + gameObject.height;

  if (
    bottomOfStone >= topOfGameObject &&
    topOfStone <= bottomOfObject &&
    stone.position.x >= leftSideOfGameObject &&
    stone.position.x + stone.size <= rightSideOfGameObject
  ) {
    return true;
  } else {
      return false;
  }
}
