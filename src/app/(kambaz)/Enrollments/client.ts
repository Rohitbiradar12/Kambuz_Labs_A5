import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

const axiosWithCredentials = axios.create({
  baseURL: HTTP_SERVER,
  withCredentials: true,
});

export const findEnrollmentsForCurrentUser = async () => {
  const { data } = await axiosWithCredentials.get(
    "/api/users/current/enrollments"
  );
  return data;
};

export const enrollInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.post(
    "/api/users/current/enrollments",
    { courseId }
  );
  return data;
};

export const unenrollFromCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.delete(
    "/api/users/current/enrollments",
    { data: { courseId } }
  );
  return data;
};
