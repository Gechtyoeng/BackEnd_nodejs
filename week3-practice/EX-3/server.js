import express from 'express';
import {logger} from './middleware/logger.js';
import { validateQuery } from './middleware/validateQuery.js';
import { authToken } from './middleware/auth.js';
import {courses} from '../EX-2/course.js'; //import courses from EX-2

const app = express();
const PORT = 3000;
app.use(logger);//apply logger globally
//app.use(authToken); //for bonus
app.get('/departments/:dept/courses',validateQuery,(req, res)=>{
    const {dept} = req.params;
    const { level, minCredits, maxCredits, semester, instructor } = req.query;

    let filteredCourses = courses.filter(course => course.department === dept);
    if (level) filteredCourses = filteredCourses.filter(course => course.level === level);
    if (minCredits) filteredCourses = filteredCourses.filter(course => course.credits >= parseInt(minCredits));
    if (maxCredits) filteredCourses = filteredCourses.filter(course => course.credits <= parseInt(maxCredits));
    if (semester) filteredCourses = filteredCourses.filter(course => course.semester === semester);
    if (instructor) filteredCourses = filteredCourses.filter(course => course.instructor === instructor);
    if (filteredCourses.length === 0) {
        return res.status(404).json({error: 'No courses found'});
    }

    res.json(filteredCourses);
});


//start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

