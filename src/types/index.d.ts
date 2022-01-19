interface Note {
  id: number;
  content: string;
}

interface Column {
  id: number;
  name: string;
  notes: Note[];
}
