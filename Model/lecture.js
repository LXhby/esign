const {db} = require('../schema/config');

const LectureSchema = require('../schema/lecture');
const Lecture = db.model('lectures',LectureSchema);

module.exports = Lecture
