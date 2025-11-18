export const selectUser = (state) => state.user.loggedUser;
export const selectRole = (state) => state.user.loggedUser?.userRole;
export const selectLoading = (state) => state.user.loading;
export const selectAllUsers = (state) => state.user.allUsers;
