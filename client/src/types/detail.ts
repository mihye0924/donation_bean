

export interface DetailDonationDataProps {
    donation_no: number | null | undefined;
    user_id: string;
    donation_name: string; 
    donation_image: string;
    donation_content: string;
    donation_company: string;
    donation_goal: number;
    donation_period: string | number;
    donation_category: string;
    donation_createAt: Date;
    donation_status: number;
}
export interface DetailPaymentAllDataProps {  
    user_id: string;
    donation_no:number;
    donation_support: string;
    donation_current: number;
    payment_division: string;
    payment_method: string;
    payment_card_name?: string;
    payment_card_company?: string;
    payment_card_expiry?: string;
    payment_card_num?: string;
    payment_account_name?: string;
    payment_account_company?: string;
    payment_account_transfer?: string;
    payment_account_num?: string; 
    payment_birth?: string;
    payment_company_code?: string;
    payment_createAt?: Date;
}

export interface DetailUserDataProps { 
    user_name: string;
    user_email: string;
}