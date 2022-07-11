export function recursivelyEdit(
  note: any,
  targetId: string,
  preferredTitle: string
) {
  if (!note) {
    return;
  }

  if (note.id === targetId) {
    note.title = preferredTitle;
  }

  for (const child in note.children) {
    recursivelyEdit(note.children[child], targetId, preferredTitle);
  }
}
