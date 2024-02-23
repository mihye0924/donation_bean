

export interface DetailDonationDataProps { 
    donation_no: number;
    user_id: string;
    donation_name: string; 
    donation_image: string;
    donation_content: string;
    donation_company: string;
    donation_goal: number;
    donation_period: string;
    donation_category: string;
    donation_createAt: Date;
    donation_status: number;
}

export interface DetailUserDataProps { 
    user_name: string;
    user_email: string;
}