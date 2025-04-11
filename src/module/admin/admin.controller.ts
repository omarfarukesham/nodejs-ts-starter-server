import { StatusCodes } from "http-status-codes";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { adminService } from "./admin.service";

const userBlockByAdmin = catchAsync(async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        throw new Error('User is not authenticated or authorized');
    }

    const  {userId}  = req.params; 

    const result = await adminService.blockUser(userId);

    if (!result) {
        throw new Error('User not found');
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'User blocked successfully',
        data: result,
    });
});

const deleteBlogByAdmin = catchAsync(async (req, res) => {
   
    if (!req.user || req.user.role !== 'admin') {
        throw new Error('User is not authenticated or authorized');
    }

    const { id: blogId } = req.params; 

    const result = await adminService.deleteBlog(blogId);

    if (!result) {
        throw new Error('Blog not found');
    }

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        message: 'Blog deleted successfully',
        data: undefined,
    });
});

export const adminController = {
    userBlockByAdmin,
    deleteBlogByAdmin,
};
