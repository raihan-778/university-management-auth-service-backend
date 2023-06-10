import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AcademicSemisterService } from './academicSemister.service';

const createAcademicSemister = catchAsync(async (req, res, next) => {
  //we can avoid use next function in controller request handler because this would be the last middleware so we do not need to set next.

  const { ...academicSemisterData } = req.body;
  const result = await AcademicSemisterService.createSemister(
    academicSemisterData
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Semister Created Successfully',
    data: result,
  });
  next();
});
// const createSemister: RequestHandler = async (req, res, next) => {
//   try {
//     const { ...academicSemisterData } = req.body;
//     const result = await AcademicSemisterService.createSemister(
//       academicSemisterData
//     );
//     res.status(httpStatus.OK).json({
//       success: true,
//       message: 'Academic Semister is created Successfully',
//       data: result,
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const AcademicSemisterController = { createAcademicSemister };
