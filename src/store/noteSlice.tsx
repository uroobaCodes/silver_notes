import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type NoteState = {
  noteText: string;
};

const initialState: NoteState = {
  noteText: "",
};

const noteSlice = createSlice({
  name: "note",
  initialState: initialState,
  reducers: {
    setNoteText: (state, action: PayloadAction<string>) => {
      state.noteText = action.payload;
    },
  },
});

export const { setNoteText } = noteSlice.actions;
export default noteSlice.reducer;
