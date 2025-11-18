import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../utils/axios.js";

// REGISTER
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (form, thunkAPI) => {
    try {
      const res = await api.post("/users/register", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// LOGIN
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (form, thunkAPI) => {
    try {
      const res = await api.post("/users/login", form);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

// GET ME
export const fetchMe = createAsyncThunk(
  "user/fetchMe",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/users/me");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Auth failed or expired");
    }
  }
);

// GET ALL USERS
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (_, thunkAPI) => {
    try {
      const res = await api.get("/users/all");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Cannot fetch users");
    }
  }
);

// GET USER BY ID
export const fetchUserById = createAsyncThunk(
  "user/fetchUserById",
  async (id, thunkAPI) => {
    try {
      const res = await api.get(`/users/patient/${id}`);
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("User not found");
    }
  }
);

// UPDATE USER
export const updateUser = createAsyncThunk(
  "user/updateUser",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await api.put(`/users/update/${id}`, data);
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Cannot update user");
    }
  }
);

// DELETE USER
export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (id, thunkAPI) => {
    try {
      const res = await api.delete(`/users/delete/${id}`);
      return res.data;
    } catch {
      return thunkAPI.rejectWithValue("Cannot delete user");
    }
  }
);

const initialState = {
  loggedUser: JSON.parse(localStorage.getItem("loggedUser")) || null,
  allUsers: [],
  selectedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    logout: (state) => {
      state.loggedUser = null;
      localStorage.removeItem("loggedUser");
    },
  },

  extraReducers: (builder) => {
    builder

      // REGISTER
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedUser = action.payload;
        localStorage.setItem("loggedUser", JSON.stringify(action.payload));
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // LOGIN
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.loggedUser = action.payload;
        localStorage.setItem("loggedUser", JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ME
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.loggedUser = action.payload;
      })

      // ALL USERS
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.allUsers = action.payload;
      })

      // USER BY ID
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      // UPDATE USER
      .addCase(updateUser.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      // DELETE USER
      .addCase(deleteUser.fulfilled, (state) => {
        state.selectedUser = null;
      });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
