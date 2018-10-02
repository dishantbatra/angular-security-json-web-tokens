export class AppUserAuth {
  userName: String = '';
  // tslint:disable-next-line:no-inferrable-types
  bearerToken: string = '';
  isAuthenticated: Boolean = false;
  canAccessProducts: Boolean = false;
  canAddProduct: Boolean = false;
  canSaveProduct: Boolean = false;
  canAccessCategories: Boolean = false;
  canAddCategory: Boolean = false;
}
