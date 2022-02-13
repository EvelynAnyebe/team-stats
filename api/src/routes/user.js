const router = require('express').Router();
const { getUser, patchUser, updateTeamMember } = require('../controllers/user.controller');
const { validateToken } = require('../middleware/auth.middleware');
const {
    teamMemberValidation
  } = require('../middleware/requestValidation/teamMember');

router.get('/profile', [validateToken], getUser);
router.get('/:id', [validateToken], getUser);
//router.get('/', [validateToken], getUsers);
router.post('/team-member', [validateToken,teamMemberValidation], updateTeamMember);
router.patch('/update/team-member', [validateToken,teamMemberValidation], updateTeamMember);

// update user
router.patch('/:userId', [validateToken], patchUser);

module.exports = router;