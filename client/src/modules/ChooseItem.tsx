import { DetailDonationDataProps } from "@/types/detail"; 

export default function ChooseItem (data: DetailDonationDataProps[]) { 
    const updateData = data.map((item: DetailDonationDataProps) => {
        return {
          ...item,
          checked:  false,
          htmlId: String(item.donation_no)
        }
      })
      return updateData
}