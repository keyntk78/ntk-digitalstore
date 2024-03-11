import { createAsyncThunk } from '@reduxjs/toolkit'
import * as apis from '../../apis'
export const getCategories = createAsyncThunk(
  'app/categories',
  async (data, { rejectWithValue }) => {
    const response = await apis.apiGetCategoreis({ sort: 'position' })
    if (!response.data.success) return rejectWithValue(response)
    return response.data.metadata
  }
)
