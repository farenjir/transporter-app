import { create } from "zustand";

export const useTourStore = create((set) => ({
	open: false,
	setOpen: (value) => set((state) => ({ open: value ?? !state.open })),
	references: {},
	setReferences: (newRef) => set((state) => ({ references: Object.assign({}, state.references, newRef) })),
}));
