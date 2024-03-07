export interface DetailDonationDataProps {
  donation_no: number;
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
  checked: boolean;
  htmlId: string;
  percentage?: number;
}
export interface DetailPaymentAllDataProps {
    reduce(arg0: (prev: any, curr: any) => any, arg1: number): unknown;  
    user_id: string;
    donation_no: number;
    donation_support: number;
    donation_current: number | undefined;
    payment_method: string;
    payment_uid: string;
    payment_name: string | undefined;
    payment_transfer: string;
    payment_createAt?: Date;
}

export interface DetailUserDataProps { 
    user_name: string;
    user_email: string;
    user_phone: number;
}

export interface CategoryTypes {
  label: string;
  id: string;
  value: string;
  imgUrl: string;
}
