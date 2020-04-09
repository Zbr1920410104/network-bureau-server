import fileService from './file/file-service';
import userService from './user/user-service';

export default {
  ...fileService,
  ...userService,
};
