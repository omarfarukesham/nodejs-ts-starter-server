import QueryBuilder from "../../builder/querybuilder";
import { IBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlog = async (payload: IBlog): Promise<IBlog> => {
  //   payload.role = 'admin';
  const result = (await Blog.create(payload)).populate(
    "author",
    "name email role"
  );
  return result;
};

// search, filtering and pagination functions for blog posts
const getBlogs = async (query: Record<string, unknown>) => {
  const searchableFields = ["title", "content"];

  const blogs = new QueryBuilder(Blog.find(), query)
    .search(searchableFields)
    .filter()
    .sort()
    .select();
  const result = await blogs.modelQuery.populate("author", "name email role");
  return result;
};

const getLatestBlogs = async (
  options: { limit?: number; sort?: Record<string, unknown> } = {}
) => {
  const { limit = 3, sort = { createdAt: -1 } } = options;
  const result = await Blog.find()
    .sort(sort as any)
    .limit(limit);
  return result;
};

const getSingleBlog = async (id: string) => {
  const result = await Blog.findById(id).populate("author", "name email role");
  return result;
};

const getBlogBySlug = async (slug: string) => {
  const result = await Blog.findOne({ slug }).populate(
    "author",
    "name email role"
  );
  return result;
};

const updateBlog = async (id: string, data: IBlog) => {
  const result = await Blog.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return result;
};

const deleteBlog = async (blogId: string, userId: string) => {
  const result = await Blog.findByIdAndDelete(blogId);
  if (!result) {
    throw new Error("Could not delete the blog");
  }
  return result;
};

export const blogService = {
  createBlog,
  getBlogs,
  getLatestBlogs,
  getSingleBlog,
  getBlogBySlug,
  updateBlog,
  deleteBlog,
};
