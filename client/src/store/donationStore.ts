import { Option } from '@/components/Select';
import { DetailDonationDataProps } from '@/types/detail';
import { create } from 'zustand'; 

interface DonationBaseStore {
    donation: DetailDonationDataProps;
    category: Option; 
    status: Option;
    setDonation: (e: DetailDonationDataProps) => void;
    setChangeCategory: (e: Option) => void;
    setChangeStatus: (e: Option) => void;
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
        status: {
            label: "",
            value: ""
        },
        category: {
            label : "",
            id: "",
            value:  "",
            imgUrl: "", 
        },
        setDonation: (newItem) => set(() => ({
            donation: newItem
        })),
        setChangeCategory: (newItem) => set(() => ({
            category: newItem
        })),
        setChangeStatus: (newItem) => set(() => ({
            status: newItem
        })),
    }));
export default DonationStore;