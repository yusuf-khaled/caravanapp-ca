export type BotPermission = 'admin' | 'sendMessage';

export const BotPermissions: { [key in BotPermission]: BotPermission } = {
  admin: 'admin',
  sendMessage: 'sendMessage',
};

export function hasScope(userPermissions: string, permission: BotPermission) {
  if (!permission) {
    return true;
  }
  if (!userPermissions) {
    return false;
  }
  const permissions = userPermissions.split(' ');
  return permissions.some(p => p === permission || p === 'admin');
}
