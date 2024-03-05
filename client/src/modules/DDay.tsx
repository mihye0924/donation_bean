 import { DetailDonationDataProps } from "@/types/detail"; 

export default function DDay (data: DetailDonationDataProps[]) { 

    const updateData = data.map((item: DetailDonationDataProps, index:number) => {
        const targetData = new Date(String(data[index].donation_period).split('~')[1]);
        const currentDate = new Date();
        const timeDiff = targetData.getTime() - currentDate.getTime();
        const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return {
            ...item, // 기존 항목 복사
            donation_period: daysRemaining // 기부 기간 업데이트
        };
    });
    return updateData;
}