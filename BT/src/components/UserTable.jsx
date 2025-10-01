import React, { useEffect } from "react";
import { getArrAllUserActionThunk } from "../redux/reducers/UserReducer";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import { deleteUserAPIbyID } from "../assets/API/UserAPI";

const UserTable = () => {
  const { arrAllUser } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArrAllUserActionThunk());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa user này?")) {
      try {
        await deleteUserAPIbyID(id);
        dispatch(getArrAllUserActionThunk()); // load lại danh sách
      } catch (err) {
        alert("Xóa user thất bại!");
        console.error(err);
      }
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-xl p-6 container mx-auto">
      {/* Tiêu đề */}
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">
        👥 User List
      </h2>

      {/* Bảng */}
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">ID</th>
              <th className="px-4 py-3 text-left font-semibold">Avatar</th>
              <th className="px-4 py-3 text-left font-semibold">Name</th>
              <th className="px-4 py-3 text-left font-semibold">Email</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {arrAllUser.map((user, index) => (
              <tr
                key={user.id}
                className={`hover:bg-gray-50 transition ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <td className="px-4 py-3 font-medium text-gray-800">
                  {user.id}
                </td>

                <td className="px-4 py-3">
                  <img
                    src={user.avatar || `https://i.pravatar.cc/80?u=${user.id}`}
                    alt={user.name}
                    className="w-12 h-12 rounded-full object-cover shadow-sm border"
                  />
                </td>

                <td
                  className="px-4 py-3 font-medium text-gray-900 max-w-[200px] truncate"
                  title={user.name}
                >
                  {user.name}
                </td>

                <td
                  className="px-4 py-3 text-gray-600 max-w-[260px] truncate"
                  title={user.email}
                >
                  {user.email}
                </td>

                <td className="px-4 py-3 text-center">
                  <div className="flex justify-center gap-3">
                    {/* Nút sửa */}
                    <NavLink
                      to={`/edituser/${user.id}`}
                      className="inline-flex items-center gap-2 px-3 py-1.5 
                                 bg-blue-500 text-white rounded-md 
                                 hover:bg-blue-600 transition-all duration-200 
                                 shadow-sm text-xs"
                    >
                      <FaEdit /> Edit
                    </NavLink>

                    {/* Nút xoá */}
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="inline-flex items-center gap-2 px-3 py-1.5 
                                 bg-red-500 text-white rounded-md 
                                 hover:bg-red-600 transition-all duration-200 
                                 shadow-sm text-xs"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {/* Trường hợp không có user */}
            {arrAllUser.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-6 text-gray-500 italic"
                >
                  Không có user nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
