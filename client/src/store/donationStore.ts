import { DetailDonationDataProps } from '@/types/detail';
import { create } from 'zustand'; 

interface DonationBaseStore {
    donation: DetailDonationDataProps; 
    setDonation: (e: DetailDonationDataProps) => void;
}

const DonationStore = create<DonationBaseStore>()(
    (set) => ({ 
        donation: {
            donation_no: 0,
            user_id: "",
            donation_name: "",
            donation_image: "",
            donation_content: "",
            donation_company: "",
            donation_goal: 0,
            donation_period: "",
            donation_category: "",
            donation_createAt: new Date(),
            donation_status: 0,
            checked: false,
            htmlId: "",
        },
        setDonation: (newItem) => set(() => ({
            donation: newItem
        })),
    }));
export default DonationStore;