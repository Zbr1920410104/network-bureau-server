export default (role) => {
  switch (role) {
    case 1:
      return '超级管理员';
    case 5:
      return '评审员';
    case 10:
      return '统计员';
    case 15:
      return '普通员工';
    default:
      return '未知';
  }
};
