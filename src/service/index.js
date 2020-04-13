import fileService from './file/file-service';
import userService from './user/user-service';
import adminService from './user/admin/index';
import staffService from './user/staff/index';
import businessManagerService from './user/business-manager/index';

export default {
  ...fileService,
  ...userService,
  ...adminService,
  ...staffService,
  ...businessManagerService,
};
