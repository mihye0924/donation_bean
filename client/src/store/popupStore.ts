import { create } from 'zustand'; 

interface PopupBaseStore {
    title: string;
    popup: boolean; 
    popupState: (e?: boolean) => void;
    setTitle: (e: string) => void;
}

const PopupStore = create<PopupBaseStore>()(
    (set) => ({ 
        popup: false, // store state  
        title: "",
        popupState: () => set((state) => ({ 
            popup: !state.popup, // state를 이용하여 state 값 변경
        })),
        setTitle: (title) => set({title}) 
    }));
export default PopupStore;