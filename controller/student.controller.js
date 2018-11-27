const User = require('../models/users.models');
const StudentSurvey = require('../models/studentSurvey.model');
const surveyChecker = require('../services/validateSurvey');
module.exports = {

    getClasses: async (req, res) => {
        const { studentId } = req.params;
        const { _id, role_id } = req.body;
        const student = await User.findById(_id);
        if (student && student.role_id === role_id && role_id === 3 && _id === studentId) {
            const classes = student.class;
            res.send({
                success: true,
                data: {
                    class: classes
                }
            })
        }
        else {
            res.send({
                success: false,
                message: "User not found or role id is not correct!"
            })
        }
    },

    getSurvey: async (req, res) => {
        const { studentId, classId } = req.params;
        const { _id, role_id } = req.body;
        const student = await User.findById(studentId);
        if (student && student.role_id === role_id && role_id === 3 && _id === studentId) {
            const classTmp = student.class.find(e => {
                return e.id === classId;
            });
            const survey = await StudentSurvey.findById(classTmp.survey_student);
            if (survey) {
                res.send({
                    success: true,
                    data: {
                        survey: survey
                    }
                })
            }
            else {
                res.send({
                    success: false,
                    message: "survey is not exist!"
                })
            }
        }
        else {
            res.send({
                success: false,
                message: "User not found or role id not correct! "
            })
        }
    },

    updateSurvey: async (req, res) => {
        const { studentId, classId } = req.params;
        const { _id, role_id, survey: surveyReq } = req.body;
        const student = await User.findById(studentId);
        if (student && student.role_id === role_id && role_id === 3 && _id === studentId) {
            const classTmp = student.class.find(e => {
                return e.id === classId;
            });
            const survey = await StudentSurvey.findById(classTmp.survey_student);
            if (survey) {
                if (surveyChecker.verify(surveyReq)) {
                    try {
                        survey.set({ ...surveyReq });
                        survey.save();
                        res.send({
                            sucess: true
                        })
                    }
                    catch (err) {
                        console.log(err);
                    }

                }
                else {
                    res.send({
                        success: false,
                        message: "Not suport this form of survey!"
                    })
                }
            }
            else {
                res.send({
                    success: false,
                    message: "survey is not exist!"
                })
            }

        } else {
            res.send({
                success: false,
                message: "User not found or role id not correct! "
            })
        }
    }

}
