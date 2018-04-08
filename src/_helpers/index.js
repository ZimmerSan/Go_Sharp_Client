export * from './auth-header'
export * from './history'
export * from './store'

export function checkRole(userRoles, allowedRoles) {
    return userRoles && allowedRoles && userRoles.some(role => allowedRoles.indexOf(role) >= 0);
}