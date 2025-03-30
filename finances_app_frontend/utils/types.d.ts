export interface userForm {
    email: string,
    password: string,
    password_confirmation: string
    name: string,
}
export interface userAuth {
    id: number,
    name: string,
    email: string,
    email_verified_at : string | null,
    created_at : string,
}

export interface itemExpense {
    id: number;
    from: string;
    to: string;
    amount: number;
    type: string;
}

export interface itemsExpense {
    id : number;
    key: string;
    expense: itemExpense[];
}

export interface sankeyDatas {
    id?: number;
    from: string;
    to: string;
    amount: number;
    type: string;
    parent_id?: number;
}

export interface userAuthError {
    [key: string]: string[];
}

export interface subscriptionDatas {
    id?: number;
    name: string;
    amount: number;
    recurrence: 'monthly' | 'annually'
    execution_date: Date;
    icon: string;
}