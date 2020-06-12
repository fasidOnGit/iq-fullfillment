export interface Task {
  id: string
  taskName: string
  taskStatus: string
  taskDetails: string
  comments: string
  userId: string // Mapped by UserId here for the relationship of
  // One to Many concept from user to task (One User Many Tasks)
}
