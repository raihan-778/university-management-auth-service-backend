const createsemester: RequestHandler = async (req, res, next) => {
try {
const { ...academicsemesterData } = req.body;
const result = await AcademicsemesterService.createsemester(
academicsemesterData
);
res.status(httpStatus.OK).json({
success: true,
message: 'Academic semester is created Successfully',
data: result,
});
} catch (error) {
next(error);
}
};
