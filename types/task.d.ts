interface Task {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  details: string | null;
}

interface TaskCreateInput {
  title: string;
  details?: string | null;
}
