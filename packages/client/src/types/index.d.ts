interface Note {
  id: string;
  content: string;
}

interface Column {
  id: string;
  name: string;
  notes: Note[];
}
