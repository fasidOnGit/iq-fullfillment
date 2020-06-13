export const userNotFound: (id: string, column?: string) => string = (id, column = 'id') => `User with ${column} ${id} does not exist`;
