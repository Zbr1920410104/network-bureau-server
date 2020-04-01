import adminService from './admin/admin-service';
import businessManagerService from './business-manager/business-manager-service';
import reviewManagerService from './review-manager/review-manager-service';
import fileService from './user/file-service';
import staffService from './staff/staff-service';

export default {
  ...adminService,
  ...businessManagerService,
  ...reviewManagerService,
  ...fileService,
  ...staffService
};
