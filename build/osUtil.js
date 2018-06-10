/**
 * Created by spy on 16/10/15.
 */

const OSUtil = {

  getUserHome(){
    return process.env.HOME || process.env.USERPROFILE;
  }

};

module.exports = OSUtil;
