import Blog from "../blog/blog.model";
import User from "../user/user.model";

const blockUser = async (userId: string) => {
    const result = await User.findByIdAndUpdate(
        userId,
        { isBlocked: true },
        { new: true } 
    )
    return result;
};

const deleteBlog = async (blogId: string) => {
    const result = await Blog.findByIdAndDelete(blogId);
    return result;
};

export const adminService = {
    blockUser,
    deleteBlog,
};
