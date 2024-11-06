

export interface UserType {
  id: string;
  name: string;
  email: string;
  picture: string | null;
  role: 'USER' | 'ADMIN' | 'ANDINO_ADMIN' | 'NEW_USER';
}

export type UserDataCollected = {
  company?: string | null
  position?: string | null
  shortDescription?: string | null
  linkedin?: string | null
  x?: string | null
  instagram?: string | null
  website?: string | null
}