  
export interface userTypes { 
    user_no: number
    user_id: string
    user_name: string
    user_nick: string
    user_email: string
    user_phone: string
    user_enum: number
    user_createAt: Date, 
    checked: boolean,
    htmlId: string
}


export interface Response {
    ok: boolean;
    userinfo: {
      user_name: string;
      user_avatar: string | null;
      user_id: string;
      user_email: string;
      user_nick: string;
      user_phone: string;
      user_enum: number
      user_createAt: number;
    };
  }