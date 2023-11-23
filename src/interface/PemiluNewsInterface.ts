export interface PemiluNewsInterface {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  posted_at: Date;
  created_at: Date;
  updated_at: Date;
}

export type PemiluNewsInterfaceForResponse = {
  id: number;
  title: string;
  author: string;
  image: string;
  description: string;
  posted_at: Date;
};

export interface PemiluNewsInterfaceResponses {
  status: number;
  message: string;
  data: PemiluNewsInterfaceForResponse[];
}

export interface PemiluNewsInterfaceResponse {
  status: number;
  message: string;
  data: PemiluNewsInterfaceForResponse;
}
