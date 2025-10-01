import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { getUserDetailbyIDActionThunk } from "../redux/reducers/UserReducer";
import { CreateUserAPI, UpdateUserAPI } from "../assets/API/UserAPI";

const FormUser = () => {
  const { id } = useParams(); // nếu có id thì là edit
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { UserDetail } = useSelector((state) => state.UserReducer);

  useEffect(() => {
    if (id) {
      dispatch(getUserDetailbyIDActionThunk(id));
    }
  }, [id, dispatch]);

  const isEdit = Boolean(id);

  const frmUser = useFormik({
    enableReinitialize: true,
    initialValues: isEdit
      ? UserDetail || {
          name: "",
          email: "",
          password: "",
          phone: "",
          birthday: "",
          gender: true,
          role: "",
          id: -1,
          avatar: "",
        }
      : {
          name: "",
          email: "",
          password: "",
          phone: "",
          birthday: "",
          gender: true,
          role: "",
          id: -1,
          avatar: "",
        },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập họ tên"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string()
        .min(6, "Mật khẩu tối thiểu 6 ký tự")
        .required("Vui lòng nhập mật khẩu"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Số điện thoại chỉ được chứa số")
        .required("Vui lòng nhập số điện thoại"),
      birthday: Yup.string().required("Vui lòng nhập ngày sinh"),
      role: Yup.string().required("Vui lòng chọn vai trò"),
    }),
    onSubmit: async (values) => {
      if (isEdit) {
        await UpdateUserAPI(values, id);
        alert("Cập nhật thông tin thành công");
      } else {
        await CreateUserAPI(values);
        alert("Thêm mới user thành công");
      }
      navigate("/");
    },
  });

  return (
    <div className="py-10">
      <form
        onSubmit={frmUser.handleSubmit}
        className="space-y-6 max-w-lg mx-auto bg-white p-8 rounded-2xl shadow-lg pt-10"
      >
        <h4 className="mx-auto text-xl font-semibold mb-4">
          {isEdit ? "Cập nhật thông tin" : "Thêm mới user"}
        </h4>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={frmUser.values.name}
            onChange={frmUser.handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter full name"
          />
          {frmUser.errors.name && frmUser.touched.name && (
            <p className="text-red-500 text-xs mt-1">{frmUser.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={frmUser.values.email}
            onChange={frmUser.handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter email"
          />
          {frmUser.errors.email && frmUser.touched.email && (
            <p className="text-red-500 text-xs mt-1">{frmUser.errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={frmUser.values.password}
            onChange={frmUser.handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter password"
          />
          {frmUser.errors.password && frmUser.touched.password && (
            <p className="text-red-500 text-xs mt-1">
              {frmUser.errors.password}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={frmUser.values.phone}
            onChange={frmUser.handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter phone number"
          />{" "}
          {frmUser.errors.phone && frmUser.touched.phone && (
            <p className="text-red-500 text-xs mt-1">{frmUser.errors.phone}</p>
          )}
        </div>

        {/* Birthday */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Birthday
          </label>
          <input
            type="date"
            name="birthday"
            value={frmUser.values.birthday}
            onChange={frmUser.handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />{" "}
          {frmUser.errors.birthday && frmUser.touched.birthday && (
            <p className="text-red-500 text-xs mt-1">
              {frmUser.errors.birthday}
            </p>
          )}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gender
          </label>
          <select
            name="gender"
            value={frmUser.values.gender ? "true" : "false"}
            onChange={(e) =>
              frmUser.setFieldValue("gender", e.target.value === "true")
            }
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="true">Male</option>
            <option value="false">Female</option>
          </select>
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Role
          </label>
          <select
            name="role"
            value={frmUser.values.role}
            onChange={frmUser.handleChange}
            className="border rounded-lg px-3 py-2 w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select role</option>
            <option value="ADMIN">Admin</option>
            <option value="USER">User</option>
          </select>
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className={`px-6 py-2 text-white rounded-lg transition-colors shadow-md ${
              isEdit
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isEdit ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormUser;
