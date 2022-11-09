export class Task {
  id?: string
  title?: string
  emoji?: string
  createdDate?: Date
  startDate?: Date
  endDate?: Date
  hours?: number
  progress?: number
  collaborators?: Collaborator[]
}

export interface Collaborator {
  name: string
  avatar: string
  background: string
  color: string
}

export enum TaskStatus {
  EXISTS, SUCCESS, NOT_FOUND
}
