let _id = 0;

module.exports = function generateId() {
  return `simplepostmd-editor-${++_id}`;
}
