import fileService from './file/file-service';
import userService from './user/user-service';
import adminService from './user/admin/index';

export default {
  ...fileService,
  ...userService,
  ...adminService,
};
