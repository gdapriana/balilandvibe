import { Request } from "express";

export interface UserRequest extends Request {
  username?: string;
  role?: string;
}
export interface Queries {
  name: string | undefined;
  address: string | undefined;
  take: string | undefined;
  description: string | undefined;
  sort: string | undefined;
  category: string[] | undefined;
  district: string[] | undefined;
  page: string | undefined;
}

export interface DestinationRequest {
  name: string;
  description: string | undefined;
  cover: string | undefined;
  address: string | undefined;
  price: number | undefined;
  latitude: string | undefined;
  longitude: string | undefined;
  districtSlug: string | undefined;
  categorySlug: string | undefined;
}

export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
