import { Option } from '@/components/Select'; 
import ChooseItem from '@/modules/ChooseItem';
import DDay from '@/modules/DDay';
import { DetailDonationDataProps } from '@/types/detail';
import { create } from 'zustand'; 

interface DonationBaseStore {
    donation: DetailDonationDataProps[]; 
    changeDonation: DetailDonationDataProps[]; 
    category: Option; 
    status: Option; 
    setChangeCategory: (e: Option) => void;
    setChangeStatus: (e: Option) => void;
    setDonation: (e: DetailDonationDataProps[]) => void;  
    setRecentDonation: (radioLabel: string, select1: Option) => void; 
    setAmountDonation: (radioLabel: string, select1: Option) => void; 
    setPercentDonation: (radioLabel: string, select1: Option) => void; 
    setExitDonation: (radioLabel: string, select1: Option) => void; 
}

const DonationStore = create<DonationBaseStore>()(
    (set, get) => ({ 
        donation: [
            {
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
            }
        ],
        changeDonation: [
            {
                donation_no: 0,
                user_id: "",
                donation_name: "",
                donation_image: "",
                donation_content: "",
                donation_company: "",
                donation_goal: 0,
                donation_period: 0,
                donation_category: "",
                donation_createAt: new Date(),
                donation_status: 0,
                checked: false,
                htmlId: "",
            }
        ], 
        status: {
            label: "전체",
            value: "0"
        },
        category: {
            label : "",
            id: "",
            value:  "",
            imgUrl: "", 
        },
        setDonation: (newItem) => set(() => { 
            const chooseItemData =  ChooseItem(newItem) 
            const updatedItemData = DDay(chooseItemData) 
          return {
            donation: chooseItemData,
            changeDonation: updatedItemData
          }
        }),  
        setRecentDonation: (radioLabel: string, select1: Option) => set(() => { 
          const data = get().donation.filter((item) => {
            if(item.donation_category === radioLabel){
                if(item.donation_status === Number(select1.value)-1) {
                  return item
                }else if(select1.label === "전체") {
                  return item
                }
            }
            if(radioLabel === "전체") {
              if(item.donation_status === Number(select1.value)-1) {
                return item
              }else if(select1.label === "전체") {
                return item
              }
            }
          })
          const recentArray = data.sort((a:DetailDonationDataProps, b:DetailDonationDataProps) => {
            const dateA = new Date(String(a.donation_period).split('~')[0]);
            const dateB = new Date(String(b.donation_period).split('~')[0]); 
            return Number(dateB) - Number(dateA)
          });   

          const recentArrayDDay = recentArray.map((item: DetailDonationDataProps) => {  
            const targetData = new Date(String(item.donation_period).split('~')[1]); 
            const currentDate = new Date();
            const timeDiff = targetData.getTime() - currentDate.getTime();
            const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
            return {
                ...item, // 기존 항목 복사
                donation_period: daysRemaining // 기부 기간 업데이트
            };
          })  
          return {
            changeDonation: recentArrayDDay
          };
        }),
        setAmountDonation: (radioLabel: string, select1: Option) => set(() => {
          const data = get().changeDonation.filter((item) => {
            if(item.donation_category === radioLabel){
                if(item.donation_status === Number(select1.value)-1) {
                  return item
                }else if(select1.label === "전체") {
                  return item
                }
            }
            if(radioLabel === "전체") {
              if(item.donation_status === Number(select1.value)-1) {
                return item
              }else if(select1.label === "전체") {
                return item
              }
            }
          })
          const changeData = data.sort((a:DetailDonationDataProps, b: DetailDonationDataProps) => {
             return b.donation_goal - a.donation_goal; 
          });
          return {
            changeDonation: changeData
          };
        }),
        setPercentDonation: (radioLabel: string, select1: Option) => set(() => {
          const data = get().changeDonation.filter((item) => {
            if(item.donation_category === radioLabel){
                if(item.donation_status === Number(select1.value)-1) {
                  return item
                }else if(select1.label === "전체") {
                  return item
                }
            }
            if(radioLabel === "전체") {
              if(item.donation_status === Number(select1.value)-1) {
                return item
              }else if(select1.label === "전체") {
                return item
              }
            }
          })
          const changeData = data.sort((a:DetailDonationDataProps, b: DetailDonationDataProps) => { 
            return b.donation_status - a.donation_status; 
          });
          return {
            changeDonation: changeData
          };
        }),
        setExitDonation: (radioLabel: string, select1: Option) => set(() => {
          const data = get().changeDonation.filter((item) => {
            if(item.donation_category === radioLabel){
                if(item.donation_status === Number(select1.value)-1) {
                  return item
                }else if(select1.label === "전체") {
                  return item
                }
            }
            if(radioLabel === "전체") {
              if(item.donation_status === Number(select1.value)-1) {
                return item
              }else if(select1.label === "전체") {
                return item
              }
            }
          })
          const changeData = data.sort((a:DetailDonationDataProps, b: DetailDonationDataProps) => { 
            return Number(a.donation_period) - Number(b.donation_period); 
          });
          return {
            changeDonation: changeData
          };
        }),
        setChangeCategory: (newItem) => set(() => ({
            category: newItem
        })),
        setChangeStatus: (newItem) => set(() => ({
            status: newItem
        })),
    }));
export default DonationStore;