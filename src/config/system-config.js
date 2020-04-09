export const TOKEN_DURATION = 60 * 60 * 24 * 7 * 1000; // 一星期

// api不走token的数据
export const UNLESS_PATH_ARR = [
  /**
   * 管理端
   */
  '/user/getUserToken'
];

export const MANAGER_PAGE_SIZE = 10;
export const REGISTRATION_PAGE_SIZE = 10;
