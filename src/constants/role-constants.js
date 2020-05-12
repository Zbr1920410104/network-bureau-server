// 权限
export const AUTHORITY = {
  ADMIN: {
    name: '管理员',
    code: 1,
    router: '/admin'
  },
  REVIEW_MANAGER: {
    name: '评审员',
    code: 5,
    router: '/reviewManager'
  },
  BUSINESS_MANAGER: {
    name: '统计员',
    code: 10,
    router: '/businessManager'
  },
  STAFF: {
    name: '普通员工',
    code: 15,
    router: '/staff'
  }
};
